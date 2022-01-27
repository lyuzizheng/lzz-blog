---
author: "LZZ"
title: "How Does Instant Messaging Work? (A Holistic IM Backend Intro)"
date: "2022-01-27"
tags: ["学习", "IM", "Architecture"]
categories: ["笔记"]
summary: "This essay takes me one month to finish writing, drawing figures. I will start from the view of a PM to define what user's need for a simple instant messaging service as well as the perspective of an SWE to design how to implement these features (backend) in a robust and reliable way."
draft: false
ShowToc: true
TocOpen: false
cover:
    image: "cover.jpeg"
    relative: true

---
This essay takes me one month to finish writing, drawing figures. I will start from a view of PM to define what user's need for a simple instant messaging service as well as the perspective of an SWE to design how to implement these features (backend) in a robust and reliable way. It will take some time to read and understand however it is followed by figures step by step. Do leave comments if u have any queires.

## What is "IM"  

### Basic "IM" introduction  

![IM ScreenShot](fig17.png#center)  

IM means instant messaging, many APPs support Instant messaging function. Tipical IM Applications include Messenger, WhatsApp, Telegram and many more other small . The most simple scenario is that User A would love to send message to User B.  

In this simple case, what we can think about fulfilling the function is that:  

![Draft Design](fig1.jpeg#center)  

In this case, everyone would store the message **on their phone** and send directly to other people's phone. However, this is a serverless solution and it is impossible for huge Apps like TikTok. So what we can think of the usecases:  

![Draft Design](fig2.jpeg#center)  

### Simple One-On-One Conversation Scenerio  

- **A** send message to server and server and server should store the message
- **B** should be notified by the server and receive the message sent by A  

In this case, we need a mechanism that informs B about the new message. So we need a push notification server that pushes new messages to your notification center on the phone. (Qn: Why pooling is not suitable for a phone? Answer in comments)  

> 📍 Feature (Messaging):  
>
> 1. Message Storage  
> 2. Push Notification (APNS + FCM) 

After this, we can push further on the messaging system. For example, we dont wanna send a push notification to **B's** notification center when **B** is in chat with **A**. We want the message to popout directly. Therefore, we need a mechanism to detect whether B is online and directly send the message to B's app. Things like "B is Typing" "Seen By B" can also be fulfilled.  

> 📍 Feature (Messaging):  
>
> 1. Message Storage  
> 2. Push Notification (APNS + FCM)  
> 3. Long Connection Notification/Online Status Detection

After talking about the connection issue. We can think about storage issues. What if A has a lot of conversation with many other people: C, D, E...  

![Draft Design](fig3.jpeg#center)  

How do we tell which msg belongs to conversation between which two users? How do we know which message to fetch if A opens the chat with different people like C, D ,E. Therefore, we need more information to be stored. The conversation information (chat info)-- the message sent to the server belongs to the conversation from which two people.  

> 📍 **Feature (Conversation):**
>
> 1. **Conversation Creation/Deletion**
> 2. **Mesage Linking to Conversation**  

Now we can support more features. With a conversation entity created and stored, we can customise functions that belong to particular conversation. For example, I would love to customise conversation background/mute conversation/prioritise conversation. Most Importantly, with the idea of a conversation object. **I could turn a one-on-one conversation into a multiple people chat--A Group Chat**  

### Group Chat Scenerio  

Inside a group chat, we could add people, remove people. And therefore, the conversation database should store who is inside the group chat.  

> 📍 **Feature (Conversation):**
>
> 1. Conversation Creation/Deletion
> 2. Mesage Linking to Conversation
> 3. **Add people/Remove People**  

![Draft Design](fig4.jpeg#center)  

Within the group chat, we could update the group chat settings, such as group name, group photo, group announcement, group member alias, group member role: Who is the admin? Who is owner? Do we allow team member to add new members? Need owner's verification to add new member? What if I have personal preference for the conversation such as I would love to mute this group chat ~ Therefore, we need:  

![Draft Design](fig5.jpeg#center)  

We may need up to 3 tables to store the related information about the conversation. One table storing the latest conversation member UserID; One Storing the personal configuration to the chat/group chat; And the common chat configuration for all people inside the conversation  

> 📍 **Feature (Conversation):**
>
> 1. Conversation Creation/Deletion
> 2. Mesage Linking to Conversation
> 3. Add people/Remove People  
> 4. Chat Management(Chat Bot, Chat File Space, Chat People Managing)

### Data Organisaiton Problem  

Now we have our conversation ready and message storage ready. One serious problem is emerging. We need to know whether user has read the messages sent to the conversation and list out all unread messages/conversations in their chatting list. Technical solution is simplier for a one-on-one chat. **However, for a group chat, if there are thousands of messages and different member has their reading position.** We need a place to store all these current reading position.
Wait!  

There is another problem. Since data sets get big and all messages are stored in one database. If one is to fetch all his conversation information and all group chats messages using this current mode. **This task will cause considerable amount of delay when fetching messages belonging to you** Why? Let's take a look of this situation that, I wanna query for all my msgs grouped in every conversation with the messges in time order and the conversation also in latest replied order. How am I supposed to write this SQL?

```sql
## Sample and poorly written
select
conv.conversation_id,
collectlist(message_table.msg)
from
(
    select
        conversation_id
    from conversation_table
    where user_id = 00000
) conv
left join message_table
on conv.conv_id = message_table.conv_id 
group by conv.conversation_id
order by ??
limit ??
```

I dont know how to write this, cos its so complicated and we know it will take long to query.  
So we need to have bullet point 5 added:  

> 📍 **Feature (Conversation):**
>
> 1. Conversation Creation/Deletion
> 2. Mesage Linking to Conversation
> 3. Add people/Remove People  
> 4. Chat Management(Chat Bot, Chat File Space, Chat People Managing)
> 5. Ordered Chat List with **fast fetching of all peronsal history messages**  

To fix the previous two problems, we can have an inbox design that storing all personal messages seperately! **Use some kind of message duplication to improve reading speed.**  

![Draft Design](fig6.jpeg#center)  

Now we have a general IM design in our mind. Let's take a look at what im_cloud actually looks like! Remember the features we need to implement:  

> 📍 **Feature (Messaging):**  
>
> 1. Message Storage  
> 2. Push Notification (APNS + FCM)  
> 3. Long Connection Notification/Online Status Detection  
>
> 📍 **Feature (Conversation):**
>
> 1. Conversation Creation/Deletion
> 2. Mesage Linking to Conversation
> 3. Add people/Remove People  
> 4. Chat Management(Chat Bot, Chat File Space, Chat People Managing)
> 5. Ordered Chat List with **fast fetching of all peronsal history messages**  

## IM Architecture  

### Basic Message Sending

![Simple Design With DB](fig7.jpeg#center)  

- Provide API `sendMessage`/ `loadMessage`
- Provide API `recallMessage`/`deleteMessage`
- Provide API `storeMessageBody`/`getMessage` (to the MsgBody KV DB)

> KV DataBase `msgbodies`:   `key = msgId`, `value = msgcontent`  
> We use KV NoSQL DB as the record is independent message record with not other relational information inside message datebase.

Now we have a `msg_id` to pass around our microservices instead of a huge message body. A message body may be a picture, a voice message or a lopng text. A msg_id is more suitable to represent a single message and pass around and it saves space. After we have a simple messaging service, we need a conversation management service.

![Simple Design With Conversation](fig8.jpeg#center)  

- Provide API `create_conversation`/ `delete_conversation`
- Provide API `add_member`/`delete_member`
- Provide API `get_conv_info`/`get_member`/ `get_setting`
- Provide API `set_read_index`

> Qn: Is that all we nned for sending/storing a message? (Not including push msg to the other user)  

### Basic Message Processing (Inbox Design)

As mentioned above, delivering messages to everyone according to which conversation is involved and what conversation setting they are using can be troublesome. Its hard to do query from msg table and conversatin table. So we choose to **use more space to save more time: We allocate a thing called inbox to arrange all messages sequentially.**

Lets recall our draft design: ![Draft Design](fig6.jpeg#center)  
So a inbox is like email inbox, or a physical mail box, we stack new messges to the inbox so msgs are arranged in a timely order. Theare are two modes of inbox design that are commonly used:

- **Push Mode (写扩散)**
- **Pull Mode (读扩散)**  

And they have their own advantages and disadvantanges so we take a look.

> Pull Mode (读扩散)
> - Every conversation would have an inbox and and when A is checking his inbox. A read opeartion would iterate all those conversaiton inbox that is related to A and pull the messages he hasnt read.  
> - Pros: Every message only requires one write to the inbox in addition to the actual message storage. Every Inbox contains the messages that is solely for each conversation and its easy to fetch history messages of one chat.
> - Cons: Difficult/Heavy to Read all messages of that single person
> ![PUll Mode](fig9.png#center)  
> In the figure, the inbox is a Zset (ordered set, choose ur db wisly) and msgs are appended in a time order
> ---
> Push Mode (写扩散)
> - Push Mode pushes all messages that person involves into his Inbox Set, order by message timeline. This operation is done when new message is produced. One only need to fetch his messages in a timeline set from his inbox.  
> - Pros: Fast reading of one's inbox list. Easy for cold start/fresh reinstall online data fetching.
> - Cons: Writing of new messages to private inbox can be heavy, especially for group chat. e.g. sending a msg to a group with 500 members would result 500 updates event of the user inbox. Also its hard to retrieve messages from one conversation and need to do filtering query.
> ![Push Mode](fig10.png#center)  

To make a robust system and optimise through put. We choose to inplement both inbox and take both advantages! See the updated design:

![Message Inbox Design](fig11.jpeg#center)  

For all messgae sending event, we feed it into a message_queue and prepare a comsumer group service lets say `message_consumer`.  

- `msg_consumer` consumes user messages sent out by `message_api_srv` from `msg_kafka`.  
- `msg_consumer` call `conv_api_src` to fetch get delivery details and delivery users (who is involved in the conversation).  
- `msg_consumer` tells `inbox_api_srv` to store the index to inboxes database.  
- The database we only store the index of the message body as otherwise the inbox would be huge. However, this can be improved as it has a lot of problems.

> Qn: What are some of the design problems in this structure or to say how to improve this architecture?

![Inbox Structure](fig12.jpeg#center)  

We can see that the `message_api_srv` does not save the msg into db. However, the comsumer would RPC call `messgae_api_srv` again to save the message to DB. This is due to single reponsiblity priciple and make `send_msg` api a public api where we build another api called `storage_msg_body` for internal service RPC call.

- Biz side only need to call `send_msg` and msg dumped to mq
- Sending is marked success and biz side can display send success to user
- MQ will preserve everything on disk as long as the producing is successful. The following process is none of sending side's business.  
- This makes sure the user side will display send success immediately
- The consumer would do rpc call `storage_msg_body` to save msg to db and do other following calls before marking MQ as comsumption successful.
- This guarantees no data loss
- MQ is in time order partitioned by hashing sender id and this gurantees msg sequence consistency

The second difference is that the `msg_comsumer` acts as a producer to produce events to `inbox_kafka` and the same event is consumed by it self and call inbox_api_srv to save user inbox. Why we have duplicated level of MQ? This is because of the group msg case. If the group has a lot of users using it. A msg sent to the group would have to inform a lot of people. So this process would be time costly so we feed this into the user inbox kafka as evets to help reduce the comsumption pressure of the previous `msg_kafka` and to improve consumption speed.

> Qn, why we need to duplicate inbox rpc event call and why not combine it into one api call called multi_inbox_insert or somethings?

### Basic Message Retriving (Long Connection & Push Notification)

Long Connection (Web Socket) is a commonly for client side to synchronise data with server side as it is a two way communication that the server can actively push data to the mobile clients. We are not discussing about the connection pool management on the server side long connection as it is not related to IM. We are talking about long connection can fulfill two things

- Client send new messages or every other request related to IM. Instead of HTTP, using WS can save repeated connection establishment procedure.
- Server push new messages to the client when the client's inbox in updated.  
- Long conenction is usually maintained by heartbeat schema

![Message Flow](fig13.png#center)  

However, there are cases that long connection is not stable and disconnects. The message sending process can then be replaced by HTTP request. The msg pushing request can only be replace by:

Push Notification, which is an unreliable push service introduced by Phone Companys, such as APNS for iOS/iPhone, FCM for Android in regions outside of China and other customised push service MiPush or HuaweiPush in China.  

Therefore we have this structure:  
![API Gateway Structure](fig15.jpeg#center)  
 
- `http_gateway`External HTTP request entrypoint /short connection
- `long_conn_srv`Long Connection through Web-Socket connection between the mobile client and the
- `aip_gateway_srv` rpc apigateway for all routes
- `biz_callback_srv` Customised for customers, when any API endpoints in the api.gateway is called by APP users. It could trigger a customised callback function that such API is called.  

![Message Receiving](fig16.jpeg#center)  

- `push_srv` Verify whether we should push the notification to the user or not: depending on the user conversation setting, user setting, appid setting, as well as the long connection status!
- IM would try long connection Frontier first, then use offline push.

However, since I have mentioned offline push notification is not reliable? Why?  

- User may pause the notification
- User may not click the notification -> Notificaiton content wont arrive the app.  

Therefore, when the client receives the messages from push notification, and when user clicks it app should do a HTTP pull request from the server to retrieve the latest msg before just using the push message as the latest one and display it to server.

![Message Receiveing](fig14.png#center)  

This is because the message should be arranged in timely order and a missing push notification would result in the later messages be mistaken and leads to message hole isssues.

## Basic Message Organisation (Inbox Index)  

It is curcial that the messages sent out by sender are will stored by receiver in a strictly ordered manner by time. So, we need to make sure everything that goes into the inbox database are indexed with a unique **monotonic increasing manner**, for every conversation and for every receiver.

Also think of a situation in you app, the app knows which messages you havent read and mark them as red dots beside every conversation. This is because the app remembers the latest conversation index you have read for every conversation you have.

![Inbox Design](fig18.jpeg#center)

- Firstly we design an index system for every inbox we have and every message will be given not only an `msg_id` by an `conv_index` and `user_index` which represents the position of every msg in the inbox
- Also we create a `read_index` for every conversation and every covnersatino member and it marks the latest read position of the person.
- When the client receives a new message. It finds out which convesation it is from and insert it into respective conversation and increase the local index by one.

> Qn: What if this message (index 766) is lost by the client and next message 767 is received by the client?
> An: We design the index to be a monolistic increasing way with consecutive number (int64 enough) and if the client detects there is empty gap between previous index and the receive index. It should call api to pull the missing one before insert the latest one to the db/covnersation

Meanwhile the `msg_api_srv` should support a new api called `pull_new_msg` for client to actively pull for new msgs if the long connectino is not stable. The newly updated architecture is shown below with the read index database established

![Conversation Database](fig19.jpeg#center)

## Globalisation and Multi Regional DataCenter  

Since our users are located around the world, and our data is stored in one region. This means if our data center is lcoated in Singapore. Two Amarican would have great latency to chate with each other. Also the cost of overseas data transfer is expensive. If we are to put the Datacenter at the US, Indian users would suffer using our services. Also, in case of one data center failure (should not happen) user can also switch to another data center for emergency use.

We need to design a multi-data center architecture to fulfill these requirements. We adjust the current structure to feed most of events in API gateway to a message queue called `sync_kafka` and use a `sync_consumer` to consume it. The best part of this is that this queue is mirrorred to other datacenter and consumed by the `sync_consumer` in other data center. Demonstrated in below figure

![Data Center Synchronisation Structure](fig20.jpeg#center)  

In this design, the `sync_consumer` will consume from all mirror topics that comes from other datacenter as well as the based topci that is from the same datacenter. However all data is discarded as we dont need these enents in same datacenter. This is because `api_gateway_srv` will handle these in direct RPC call. Also not all actions initiated by user will be synchronised. Only those that will edit the state of the server will be feed to the kakfa, for instance, `send_message` action will be synchronised as `fetch_message` will not be synced. 

![Multi DataCenter](fig21.jpeg#center)  

In this way, all data are replicated and stored in multi data center architecture and we empower users to only retrieve chat data from his own datacenter(depends on his account registration location).  

## Recent Converstaion Order

Imagine a case where you app just reinstalled on you phone and you open the inbox the first time. We would love to load your inbox as fast as possible. However, you have been away for a while and latest 1000 messages are all from a single group chat. If we load the most recent messages for you, you would only see one chat in your inbox. Therefore, its necessary to maintain a conversation rank order list from the server side marking the most recent chat that involves you.  

![Conversation Rank Structure](fig22.jpeg#center)  

## Summary  

Remember this?  

> 📍 **Feature (Messaging):**  
>
> 1. Message Storage  
> 2. Push Notification (APNS + FCM)  
> 3. Long Connection Notification/Online Status Detection  
>
> 📍 **Feature (Conversation):**
>
> 1. Conversation Creation/Deletion
> 2. Mesage Linking to Conversation
> 3. Add people/Remove People  
> 4. Chat Management(Chat Bot, Chat File Space, Chat People Managing)
> 5. Ordered Chat List with **fast fetching of all peronsal history messages**  

We have now implemented all features in this list and can tell the PM: Hey I have got all you want!!!  

## Left Over Issues

However there are a lot of systematic issue in this huge architecture.

Which consitency level do we provide and how do we achieve that?
How do we maintain high availability of our service?
Do we provide partition tolerance? How to avoid key components of the system to fail or lag?

I am still learning on these issues and will write another essay regarding these issues! Chill~

## Acknowledgement

My Senior Rance Ren on providing insights and [如何设计一个亿级消息量的 IM 系统-技术圈](https://jishuin.proginn.com/p/763bfbd59be4)
