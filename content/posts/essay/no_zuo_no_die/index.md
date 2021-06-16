---
author: "LZZ"
title: "【持续更新 23th May 2021】子正的作死日记"
date: "2021-05-23"
tags: ["作死", "日记"]
categories: ["随笔"]
ShowToc: true
TocOpen: false
summary: "作为不断勇于尝(zuo)试(si)的新青年，特此记录下勇于尝试新东西造成的及其后悔的作死记录。"
cover:
    image: "cover2.jpg"
    relative: true
    alt: "在作死的边缘试探"

---
作为不断勇于尝(zuo)试(si)的新青年，特此记录下勇于尝试新东西造成的及其后悔的作死记录。

## 23th May 2021 触发Intel SpeedStep 锁 0.79Ghz

尝试Windows 10 21H1 Insider Preview 触发系统Bug（也可能不是系统的问题），导致Dell XPS 15 9570 不断正常使用触发SpeedStep，CPU降频至800MHZ根本用不了了。尝试过断电，升级Bios，各种方法后决定重装系统解决。  

![Example image](2021_05_23_SpeedStep/fig1.png#center)  

- 24th May 重装系统后发现并没有解决问题，由于没有新的散热硅脂，没办法更改散热情况。只好打开ThrottleStop发现经常发生Power Limit Throttling这个现象，怎么也找不到解决办法，只好对CPU进行降压0.12V的尝试！  
- 发现Dell这版bios把降压功能锁了，我RTMD！！！给Bios降级至一个帖子说的可以进行降压的版本，用thorttlstop降压，开启Scheduling Task自动启动。
- 27th May，重新涂抹散热硅脂，给供电芯片也安装上了散热贴片。开启全速运转模式。

问题暂时解决，今生不再购买DELL任何产品。RNM退钱.jpg

## 07th May 2021 触发Intel Control Penal导致的黑屏bug

因屏幕色彩不准确，尝试从最新的Intel集显penel更改对比度，触发Intel集显黑屏bug，（系统正常工作，屏幕背光工作）。处于死循环状态。  

- 发现进入safe mode可以解决！进入是发现之前不小心尝试了Bitlocker把硬盘锁了！！！无法进入safe mode...要解锁bitlocker必须进入系统正常通过设置解锁，然后显示屏不亮不能进入系统 ----套娃式问题🤣🤣🤣  
- 经过许久后发现：用hdmi连接第二个显示器可以解决，第二个显示器不受bug影响！我便连接显示器后尝试把对比度调回原值，---- **再次触发bug，导致显示器也黑屏了，显示器方法不能再用了。。**，发现并不是对比度数值造成的bug而是**调节**这个动作触发bug，需要卸载driver解决！！！但是因为已经黑屏了，没有gui的情况下已经晚了。。。  

重装系统后解决。  
