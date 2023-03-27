---
author: "Brabalawuka"
title: "Bytedance Crush Course学习笔记"
date: "2021-10-03"
tags: ["学习", "Golang"]
categories: ["笔记"]
summary: "字节后端工程师教程学习笔记"
draft: true
ShowToc: false
TocOpen: false

---
## Go程序语言设计最佳实践  

### 常用类型

#### Slice  

- 数组是值传递
- slice也是值传递，slice是一个struct，内部数组地址是引用不变。 所以要避免修改两个变量会影响同一个引用的事情发生。`copy(dst, src)`  

```golang
v1 = []int{1,2,3,4,5,6}
//wrong practice
v2 := v1[0:6]
v3 := v1[2:5] 
//Correct practive
v2 := make([]int, 6)
copy(v2, v1[0:6])
v3 := make([]int, 3)
copy(v3, v1[2:5])
```  

#### Channel  

- 长度，类型  
- 操作：  
  - read ```v := <-ch```  
  - write ```ch<->= v```  
  - close ```close(ch)```  
- 并发安全  
- 长度为0的 ```ch := make(chan int)```  
  - 不发生拷贝
  - 读在写之前发生  
- 长度大于0 ```ch := make(chan int, len int)```  

#### Interface  

- 接口有type和data两个东西  

```golang
type iface struct {
  itab, data uintptr
}
```  

- 定义接口，通用产物  

```go
type Comparable interface{
	Len() int
	Less(i, j interface{}) bool
	Swap(i, j interface{}) bool
}
func Sort(data comparable){
	...
}
```  

### 并发  

- 通过通信来共享数据，而不是通过共享数据来通信  

![Example image](fig1.png#center)
[Context详解](https://studygolang.com/articles/30675)
