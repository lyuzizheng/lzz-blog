---
author: "LZZ"
title: "[WIP] How Does Instant Messaging Work (In TikTok)"
date: "2021-12-18"
tags: ["学习", "IM", "Architecture"]
categories: ["笔记"]
summary: "This essay will start from a view of PM to define what user's need for a simple instant messaging service as well as a perspective of SWE on how to implement these features (backend) in a robust and reliable way."
draft: false
ShowToc: false
TocOpen: false
cover:
    image: "cover.jpeg"
    relative: true

---

## What is "IM"  

### Basic "IM" introduction  

IM means instant messaging, many APPs support Instant messaging function. The most simple scenario is that User A would love to send message to User B.  

In this simple case, what we can think about fulfilling the function is that:  

![Example image](fig1.jpeg#center)  

In this case, everyone would store the message **on their phone** and send directly to other people's phone. However, this is a serverless solution and it is impossible for huge Apps like TikTok. So what we can think of the usecases:  

![Example image](fig2.jpeg#center)  

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

After talking about the connection issue. We can think about storage issues. What is A has a lot of conversation with many other people: C, D, E...  

![Example image](fig3.jpeg#center)  

How do we tell which msg belongs to conversation between which two users? How do we know which message to fetch if A opens the chat with different people like C, D ,E. Therefore, we need more information to be stored. The conversation information-- the message sent to the server belongs to the conversation from which two people.  

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

![Example image](fig4.jpeg#center)  

Within the group chat, we could update the group chat settings, such as group name, group photo, group announcement, group member alias, group member role: Who is the admin? Who is owner? Do we allow team member to add new members? Need owner's verification to add new member? What if I have personal preference for the conversation such as I would love to mute this group chat ~ Therefore, we need:  

![Example image](fig5.jpeg#center)  

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

There is another problem. Since data sets get big and all messages are stored in one database. If one is to fetch all his conversation information and all group chats messages using this current mode. **This task will cause considerable amount of delay when fetching messages belonging to you**
So we need to have:  

> 📍 **Feature (Conversation):**
>
> 1. Conversation Creation/Deletion
> 2. Mesage Linking to Conversation
> 3. Add people/Remove People  
> 4. Chat Management(Chat Bot, Chat File Space, Chat People Managing)
> 5. Ordered Chat List with **fast fetching of all peronsal history messages**  

To fix the previous two problems, we can have an inbox design that storing all personal messages seperately! **Use some kind of message duplication to improve reading speed.**  

![Example image](fig6.jpeg#center)  

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

### Message Sending and Retriving  

![Example image](fig7.jpeg#center)  

- Provide API `sendMessage`/ `loadMessage`
- Provide API `recallMessage`/`deleteMessage`
- Provide API `storeMessageBody`/`getMessage` (to the MsgBody KV DB)

> KV DataBase `msgbodies`:   `key = msgId`, `value = msgcontent`  
> We use KV NoSQL DB as the record is independent message record with not other relational information inside message datebase.

Now we have a `msg_id` to pass around our microservices instead of a huge message body. A message body may be a picture, a voice message or a lopng text. The id suitable to represent a single message to pass around.  
