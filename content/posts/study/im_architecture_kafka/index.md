---
author: "Brabalawuka"
title: "Evnet Based Multi-DataCenter Synchronisation in IM System"
date: "2022-05-03"
tags: ["学习", "IM", "Architecture"]
categories: ["笔记"]
summary: "This essay is a follow up introduction on IM Architecutre. We will discuss some common consistency, avilability and partition tolerance issues we face in a multi-datacenter, distributed architecture of the IM system. We will also discuss how we tackle with thess issues in the service implementation to acieve high avaliblity and parition tolerance meanwhile achieving final consistency."
draft: true
ShowToc: true
TocOpen: false
cover:
    image: "cover.jpeg"
    relative: true

---
This essay is a follow up introduction on [IM Architecutre](https://brabalawuka.xyz/posts/study/im_architecture/) . We will discuss some common issues we will face in a multi-datacenter architecture of the IM system. These issues involves consistency, avilability and partition tolerance issues in the distributed systems. We will also discuss how we tackle with thess issues in the service implementation to acieve final consistency with a key component called Kafka. It will take some time to read and understand however it is followed by figures step by step. Do leave comments if u have any queires. 

We assume u would love to know about IM that serves for millions of people around the globe but not for a single country.

## Multi DataCenter, Multi Master and Multiple Sync Issues...  

Why do we need more then one datacenter? A multi-data center architecture (lets say `DC-A` and `DC-B`)is necessary as in if one datacenter (`DC-A`) becomes unavailiable, we can redirect to the users from `DC-A` to `DC-B`. However, this is a `master(main)-salve(follower)` mode that all users are still using a single datacenter where as the other one acts as the backup. This mode is simple as we can constantly sync data from master to slave just based on all request sequence. However When a robust IM-System would love to provide service for global users with great user experiences, every user should be served by the data center that is closer to him. This is to reduce latency as for some region that is remote. These people has week internet connection and it is unstable for them to request from datacenters located at the other side of the ocean and await for loading ring spinning for seconds on their screen. Therefore, our master-slave architecture is not very suitable in this situation.  

We need a multi-master architecure, which means data writes and retrives from different datacenters. For example, if a user from SG would love to start a chatting with a user from the US. Your server should be able to handle this.  

![Draft Design](fig1.png#center)  

There should be two sets of your microservices and each of them can operate independently as a complete IM system and here comes the question, how should the SG use sends messages to US if he is using `DC-A` and the US user is using `DC-B`? We need a system that does data synchronisation between the two datacenter. And during the synchronisation we need to achieve the following goals:  

> 