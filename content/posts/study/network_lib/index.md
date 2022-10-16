---
author: "LZZ"
title: "Interesting Empty Struct Context Key"
date: "2022-08-04"
tags: ["学习", "Golang"]
categories: ["笔记"]
summary: "I used to encounter an interesting increase in latency after I upgrade the network library dependency of my service. The reason was that the pollers of Netpoll occupy too much cpu. However, I could barely understand what happened in the networking part of the framework. So this session I will do a rough introduction on network packages"
draft: false
ShowToc: false
TocOpen: false
cover:
    image: "cover.png"
    relative: true

---

I used to encounter an interesting increase in latency after I upgrade the network library dependency of my service. The reason was that the pollers of Netpoll occupy too much cpu. However, I could barely understand what happened in the networking part of the framework. So this session I will do a rough introduction on network package.

# Beginning

When we write a KiteX/gRPC handler, we usually just implement the method of the generated code, however, I will only use Kite, right now KiteX as an Example since its widely used in our comapny. KiteX is a high perfromance go RPC framework developed by TikTok.

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

