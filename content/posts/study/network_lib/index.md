---
author: "LZZ"
title: "Journey of an RPC call at server-- from Unix Socket to Go Handler"
date: "2022-08-04"
tags: ["学习", "Golang"]
categories: ["笔记"]
summary: "I used to encounter an intriggering issue, the Redis call has an increase in latency after I upgrade the network library dependency of my service RPC framework. The reason was that the pollers of RPC networker library occupy too much CPU and it grabs the default Redis netpoller's CPU schedule. However, I could barely understand what happened in the networking part of the framework. So this session I will do a rough introduction on network packages"
draft: false
ShowToc: false
TocOpen: false
cover:
    image: "cover.jpeg"
    relative: true

---

I used to encounter an interesting increase in latency after I upgrade the network library dependency of my service. The reason was that the pollers of Netpoll occupy too much cpu. However, I could barely understand what happened in the networking part of the framework. So this session I will do a rough introduction on network package.

# Beginning

When we write a [KiteX](https://github.com/cloudwego/kitex)/gRPC handler, we usually just implement the method of the generated code, however, I will only use Kite, right now KiteX as an Example since its widely used in our comapny. KiteX is a high perfromance go RPC framework developed by TikTok.

```go
//kite: file: handler.go

//Implement LoadMorePerUserInbox Method.
func LoadMorePerUserInbox(ctx context.Context, r *message_api.PerUserMessagesRequest) (response *message_api.PerUserMessagesResponse, err error) {
    //Implement your method here
    return nil, nil
}

//or gRPC: 
func (s *routeGuideServer) ListFeatures(rect *pb.Rectangle, stream pb.RouteGuide_ListFeaturesServer) error {
        ...
}
...
```

Also we know:

-  OK, this call is handled by Kite framework.
-  Its an RPC call, and we use thrift IDL to define the call content fields.
- The framework generates the serialisation code for us.
- The framework would accept TCP connection from clients and somehow transforms the tcp packet of the request and provides you with the content u need
- The framework somehow is so powerful and it handles hundreds of concurrent requests and manages hundreds of connections with clients  

**So the equesiton is, how does everything work with one another? What designs, patterns and features do they have to make a server robust and good? How does framework help u do a lot of things?**

# TCP Server (Linux)

## UNIX Domain Socket

> Sockets are the constructs that allow processes on different machines to communicate through an underlying network, being also possibly used as a way of communicating with other processes in the same host (through Unix sockets).  

To create a TCP server, u need to create a UNIX socket by calling the socket(2)interface of the Linux System. 

![TCP Archi](fig1.png#center) 

```c
int main(int argc , char *argv[])
{
    //Create struct for server addr and client addr
    struct sockaddr_in cliaddr, servaddr;
    //Create socket FD for TCP
    listenfd = socket(AF_INET , SOCK_STREAM , 0);
    //Prepare the sockaddr_in structure
    server.sin_family = AF_INET;
    server.sin_addr.s_addr = INADDR_ANY;
    server.sin_port = htons( 8888 );
    //Bind
    bind(listenfd, (struct sockaddr *)&servaddr , sizeof(server));
    //Listen
    listen(socket_desc , 3);    
    //Accept
    for ( ; ; ){
        c = sizeof(struct sockaddr_in);
        //Get a new socketfd from the listener queue
        connfd = accept(socket_desc, (struct sockaddr *)&client, (socklen_t*)&c);
        //Handle with connfd
        //e.g. n = recv(connfd, buf, MAXLINE,0)
    }
    //Other Logics
    return 0;
}
```

### Insights:

- Linux System uses FD to manage sockets and connections. We create a global socket `listenfd` as a listener on the socket address and for every connection we receive we create a new socket fd `connfd` to handle it
- To create a server, u need 4 init step: `create -> bind -> for loop listen -> accept a con -> read...`
- `Accept()` function delivers you a socket from a queue of already accepted connections (TCP handshake finished). While the queue is empty, it blocks.

### Issues:

- And how to handle a single connection? (How to read and write data from the `connfd`)
- `Connfd` is a new file descriptor returned by the accept function. How to manage several connections? 
- How to manage `fd` life cycle? When do we delete it?

## Network IO Model

Network IO has two kinds, synchronous and asynchronous. The difference is that whether the use process has to wait for the data copying form the kernel space to user space buffer. 

### Blocking IO Socket (Sync)

```c
for ( ; ; ){
    c = sizeof(struct sockaddr_in);
    //Get a new socketfd from the 
    connfd = accept(socket_desc, (struct sockaddr *)&client, (socklen_t*)&c);
    //Block here and await receive returns the data buffer
    int recvlen = recv(connfd, buf, RECV_BUF_SIZE,0)
}
```

![Blocking](fig3.svg#center) 

If ur user buffer is too small for the socket buffer received size, u need to call recv several times to receive all data. This is inconvenient.
> Is the socket buffer the TCP sliding window? I actually dont now

### "Non" Blocking IO Socket (Sync)

Its not true non blocking for data read. Its non blocking for data ready checking

```c
// Change Socket to Non Blocking
int main(int argc , char *argv[])
{
    //...
    //Create socket FD
    listenfd = socket(AF_INET , SOCK_STREAM , 0);
    //Change to Non Blocking Sample
    fcntl(sock_fd, F_SETFL, fdflags | O_NONBLOCK);
    //Loop call
    while(1)  {  
        int recvlen = recv(sock_fd, recvbuf, RECV_BUF_SIZE) ; 
        ......
    }
    //When system returns error like connection failed/terminated
    close(connfd); 
    close(listenfd)
    //Other Logics
    return 0;
}
```

![TCP Archi](fig4.svg#center) 

#### Insights:

- Handle a single connection by blocking IO or non blocking IO
- We use polling for non-blocking IO 

#### Issues:

- Still dont know how to manage multiple connections `connfd` on single `listenfd`
- Polling looks so stupid

### "Non" Blocking IO API (select, poll, epoll in Linux) (Sync)

We now see how Linux helps us manage multiple connections (whether there is data in connfd). 
Other systems like MacOS (UNIX based will use kqueue) will be omitted here

> In Chinese context, this is commonly called **IO Multiplexing** (IO多路复用) and it is most commonly used is a lot of network libraries

#### Select

```c
//return num of ready fds
int select (int n, fd_set *readfds, fd_set *writefds, fd_set *exceptfds, struct timeval *timeout);
```

- We omit the source code sample here as its getting complicated
- The `select` has  `fd_set` which is a fixed size buffer (max 1024 why?) to store all accepted connfd we accepted. Once any of the fd is ready for `recv()`, it will inform our user about it. So that we wont block at the `recv()` function
- The thing is that when the `fd` is ready, it will amend the fd status in the `fd_set` to tell user that connfd is ready. However, it wont tell us which one, so we need to do the for loop on the fd_set to check int `FD_ISSET(int fd, fd_set *fdset)`; 
- After checking, we need to put these fds back to the new fd_set to ask system to mange it. So it take O(n) * 2 time for checking and 2 times of data copying.

#### Poll

- `int poll (struct pollfd *fds, unsigned long nfds, int timeout);`
- Poll function improves the size limit of the array by using the pollfd field to mark the connfd array length. The first para is the first connfd pointer
- However, when the function returns, (the number of ready connfd), poll still dont tell us which one is ready.  

#### Select and Poll Issues:  

- `select` and `poll` becomes heavy when there are a lot of client connfd as every time we call is (we do for loop on these functions `O(n)*2`) we copy the all the connfds out **from the kernel space to userspace and we still need to check on all the connfds we have and see which one is ready. If we have 10000 connfds. Data copy will occupy huge CPU**.  
- Also, the kernel is doing another O(n) checking on all the connfd to check whether the fd is ready for event

#### Epoll

```c
typedef union epoll_data {
    int      fd;
    //...
} epoll_data_t;

struct epoll_event {
    uint32_t     events;    /* Epoll events */
    epoll_data_t data;      /* User data variable */
};
//Core functions
int epoll_create(int size);
int epoll_ctl(int epfd, int op, int fd, struct epoll_event *event);
int epoll_wait(int epfd, struct epoll_event *events, int maxevents, int timeout); // ready events will be stored in the array we passed in
```

- `epoll_create`: Create an epoll instance (`epollfd`) and all rest operations are based on that instance
- `epoll_ctl`: We ask the epoll instance to take care of the `connfd` or `listenfd` we have，by using operation like op(`ADD/DEL/...`), and we declare what kind of events we wanna pay attention to (`EPOLLIN/EPOLLOUT/...`)。
- `epoll_wait`: Block until there is event ready for any fd in the epollfd, the reutrn value are the number of ready events and the **ready ones will be stored in the array we passed in**
- **ET or LT**

  - To use `epoll_wait`, we must know it has two modes: Edge trigger and Level Trigger.
  - ET will trigger epoll events only once when there is event occurring (e.g. readable)
  - LT will trigger every time if the event can be carried out (e.g. Reading of the connfd buffer is not finished) If the package is huge, and the copying of data has not finished before the next call of epoll_wait occurs, it will trigger again and return the  connfd ready event back

```
Level Triggered:
        ......
        |    |
________|    |_________


Edge Triggered:
         .____
         |    |
________.|    |_________
```

- Epoll Events
  - `EPOLLIN`: readable
  - `EPOLLOUT`: writable
  - `EPOLLIN` + `EPOLLRDHUP：`
    - FIN Packet from other side (close or shutdown)
  - `EPOLLIN`+`EPOLLHUP`+`EPOLLRDHUP`
  - `EPOLLIN`+`EPOLLRDHUP`+`EPOLLHUP`+`EPOLLERR`
  - When checking, we check a combination of events

#### Epoll Insights:  

- Epoll prevents the user sapce <-> kennel space copyig of the `connfd` for every epoll_waitwe call and thus saves CPU (epoll uses a red-black tree to store all the `connfd` and takes O(logn) to insert and delete)
- Epoll prevents `O(n)` checking of ready `connfd` by returning the ready event directly to u. This is done through a system callback registered by the epoll to the system on every `connfd` it has epoll

### Asynchronous IO

- Omitted here can do self research if interested

## Handler Model  

To summarise what we have learnt:

- We create a listener fd and listen networking events
- We create a connfd accept new connection established events on listener fd
- We use higher level system API to help us manage two things:
  - Whether the is new connection of socket listenfd
  - Whether every connfd is readable / closed ....

### Reactor

![Reactor](fig5.svg#center) 

### Proactor 

Omitted as its about Aynchronous Network IO pattern and we dont use it 

# NetWrok Library

The core funciton of a net library is to monitor/listen the status of a huge amount of connfds(via syscall) and respond to the status change/ event triggered efficiently and securely.

![TCP Archi](fig6.svg#center)  

## golang/net

Packages using net as default net library (redis, sarama, kite, grpc....)

### TCP Server  

Talk is cheap, show me the code  

```go
package main

import (
        "log"
        "net"
)

func main() {
        //create listener
        listen, err := net.Listen("tcp", ":8888")
        if err != nil {
                log.Println("listen error: ", err)
                return
        }
        for {   //block here to create connection
                conn, err := listen.Accept()
                if err != nil {
                        log.Println("accept error: ", err)
                        break
                }
                // start a new goroutine to handle the new connection.
                go HandleConn(conn)
        }
}
 
func HandleConn(conn net.Conn) {
        defer conn.Close()
        packet := make([]byte, 1024)
        for {   // block here if socket is not available for reading data.
                n, err := conn.Read(packet)
                if err != nil {
                        log.Println("read socket error: ", err)
                        return
                }
                // same as above, block here if socket is not available for writing.
                _, _ = conn.Write(packet[:n])
        }
}
```

Do you still recall the original socket programming when we create a `listenerfd` and accept an `connfd`
Does it looks a bit similar as the basic socket programming (listen -> bind -> accept -> read -> write -> close). However this net package look like a blocking pattern but its internals arr of great difference. 

- Its a fake **blocking pattern** when writing go code but a very smart **non-blocking io multiplexing** using different kenel commands from internal. This helps eases developers' effort in writing code. Developers do not have to care about context switch, goroutine scheduling and kernel network handling. Go netpoller is based on epoll/kqueue/iocp depending on which operating system it uses.

#### Insights

- Its uses `epoll` et mode in the bottom layer to handler `listenerfd` and  `connfd` 
- Every `listernerfd` and `connfd` corresponds to a goroutine and uses a goroutine to handle each connection. However, `listernerfd` only has one and its using main goroutine to do accept()
- `net.Listen("tcp", ":8888")` returns a `*TCPListener`, its a struct that implements the `net.Listener` interface.  listener.Accept() would create a new struct instance `*TCPConn` that implements net.Conn interface and it contains `net.conn` struct. 
- So we know `*TCPListener *TCPConn` are supposed to contain these two `listenerfd` and  `connfd`. So after read the source code, the fd are actually wrapped by a struct called `netFD` netFD contains a  `poll.FD` struct，and `poll.FD` caontains two things `Sysfd` and `pollDesc`.
- Sysfd are the actual `listenerfd` and  `connfd` and pollDesc is an operator that controls the read write timeout and all other scheduling things.

![Net Package](fig7.jpeg#center)  

> Question: Is blocking wasting CPU resources?  

### Core Structs  

```go
// TCPListener is a TCP network listener. Clients should typically
// use variables of type Listener instead of assuming TCP.
type TCPListener struct {
        fd *netFD
        lc ListenConfig
}

// TCPConn is an implementation of the Conn interface for TCP network
// connections.
type TCPConn struct {
        conn
}
 
// Conn
type conn struct {
        fd *netFD
}
```

How dose netFD works

```go
// Network file descriptor.
type netFD struct {
        pfd poll.FD
 
        // immutable until Close
        family      int
        sotype      int
        isConnected bool // handshake completed or use of association with peer
        net         string
        laddr       Addr
        raddr       Addr
}
 
// FD is a file descriptor. The net and os packages use this type as a
// field of a larger type representing a network connection or OS file.
type FD struct {
        // Lock sysfd and serialize access to Read and Write methods.
        fdmu fdMutex
        // System file descriptor. Immutable until Close.
        Sysfd int
        // I/O poller.
        pd pollDesc
        // Writev cache.
        //...... other fields
}
```

### net.Listen

![NetListener](fig8.jpeg#center)  

- After call `net.Listen`, the bottom layer will create an `listenfd`  and use it to initialize the listener's `netFD`, and then call the `netFD`'s `listenStream` method to complete the bind &listen operation on the socket and then call init of `netFD` (mainly for the pollDesc initialization), the call chain is `runtime.runtime _pollServerInit -- > runtime.poll _runtime_pollServerInit -- > runtime.netpollInit`, the main things are: 
  - Call `epollcreate1` to create an epoll instance `epfd`, which is used as the only event-loop for the entire runtime; 
  - Call `netpollopen` to register the listenfd to the netpoll  

### net.Accept  

![NetAccept](fig9.jpeg#center)  

- `netFD` will create a `connFD` when its `listenFD` is ready to accept new connection
- `netFD` will go through the same init process on new connFD and add to epoll for listening
- When there is no new connection which will get `EAGIN` err, `nefFD` will call `pollDESC.waitRead` to park the current goroutine, until the epoll informs that the `listenFD` is ready, the waitRead will return and accept new connection  

### conn.Read

[conn.Read](fig10.jpeg#center)  

- netpollBlock would park the current goroutine and the detail is not elaborated (too complicated)

### netPoll  

[netPoll](fig11.png#center)  

- Since Accept()/Read() goroutine wouble be parked by the netpollblock and therefore we need to a function that detect which one is ready
- `netpoll()` would call `epollwait()` to constantly get ready to run connfd and listenfd so that the netpoll would know which corresponding fd is ready
- `Netpoll` would retriece the `pollDesc` from the epollevent which saves the corresponding goroutine information 
- `Netpoll` would then put that goroutine in to the readlist for runing

- `Netpoll` is not constanly running, its called by the schedule at various places such as runtime.schedule()
- `sysmon` will ensure `netpoll` get called very often  

### Issues:  

- Reactor Model: One Reactor Multi Hander (goroutine) model and when connection is great on one machine, **it will affect the performance of the programme**
- **Doesnt Support ZeroCopy**, conn.Read(b []byte) will carry out a memory copy from kernel to user sapce then  when we do unmarshalling of the byte, usually we will copy the data again since the memory allocated for the struct is not same as the one read from the network library
-` net.Conn` **wont be closed by the server unless we read it and detect the error**, since we are using epoll and when the other end closes the connection, the server side connection will still be there

## [cloudwego/netpoll](https://github.com/cloudwego/netpoll)  

This package is the default network package of the TikTok' Go RPC framework [Kitex](https://github.com/cloudwego/kitex), which is a high performance (better than GRPC) framework for TikTok backends. So why it is better than the default network library.



