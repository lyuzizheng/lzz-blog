---
author: "Brabalawuka"
title: "【持续更新】十年脑血栓也设计不出来的APP逻辑"
date: "2021-08-27"
tags: ["吐槽", "日记"]
categories: ["随笔"]
summary: "脑子瓦特了，脑血栓了，都设计不出来的APP逻辑，离谱的BUG吐槽记录"
ShowToc: true
TocOpen: true
cover:
    image: "cover.jpg"
    relative: true
    alt: "食屎啦你.jpg"
---

## 21th Aug 2021 Shopee无语的账号删除机制

用Google登陆Shopee会自动创建以Google Gmail为邮件的账号。就会导致这个email不可用，但是注销账号需要你自行再添加电话号码才能注销。。。  

{{< youtube 3XjcL3_iyyg >}}  

### 27th Aug 2021 已向shopee的朋友反馈，研发表示会审核现有机制进行修复

## 27th May 2021 QQ智障密保设计

AppVersion：  

- 手机版 GooglePlay V8.2.11  
- 电脑版 Windows 9.4.7.27805

众所周知，作为一款国民APP， QQ是用国外手机号当作手机密保的！但是登录的时候如果一旦IP不太寻常（qq号和密码正确）就会需要你验证手机，在PC版QQ上会显示这样的界面。

![Example image](2021_05_27_QQ/fig1.jpg#center)  

问题来了！！TMD，106开头的短信通道只能接收中国大陆的手机短信，你国外的手机号发短信发到欠费10000块钱他也是收不到的。如果不选择此项验证的话，只能用手机扫码。然而手机登陆的界面你会发现也是需要验证手机的。

**然后我直接震惊**   

首先在登录验证界面你会发现之前早就不用的历史密保手机？？？  

![Example image](2021_05_27_QQ/fig2.jpg#center)  

而我现在正在用的是这个密保手机，也就是PC版显示的。  

![Example image](2021_05_27_QQ/fig3.jpg#center)  
![Example image](2021_05_27_QQ/fig4.jpg#center)  

请问腾讯：  

- 腾讯你好大的胆子！！！我在更换密保手机后依然储存着我之前的手机记录，也就是说你的任何信息无论更改与否**所有历史记录腾讯都是知道的只是一般不会有人发现而已**。  
- 这是什么数据库结构？更换后依然显示旧手机，那我怎么验证嘛！！！既然都不可以只能麻烦使用人工辅助验证。  

高潮来了：  

当你选择辅助验证更换密保手机时，你会发现一些奇奇怪怪的东西：  

![Example image](2021_05_27_QQ/fig5.jpg#center)  
![Example image](2021_05_27_QQ/fig6.jpg#center)  

中山学生约？？？？我不是中山人，我是唐山人！！！  

解决办法:邀请三个好友不你做一些列非常复杂的验证。  

