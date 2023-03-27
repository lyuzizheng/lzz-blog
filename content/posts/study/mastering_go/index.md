---
author: "Brabalawuka"
title: "Mastering Go学习笔记"
date: "2021-07-23"
tags: ["学习", "Golang"]
categories: ["笔记"]
summary: "Mastering Go Second Edition 学习笔记"
ShowToc: true
TocOpen: false

---

起始于2021-05-15，持续更新，环境为Windows 10 21H2。其中Chapter7为翻译内容，欢迎大家围观 [Mastering Go Second Edition中文版](https://github.com/hantmac/Mastering_Go_Second_Edition_Zh_CN)  

## Chapter 1 Go and the Operating System

### Some fact

- Go 起源于2009，Made By Google
- Go2 is developing
- Go uses **static linking** by default and builds into executable binary
- Go supports Unicode
- Go do not do preprocessing

### 安装

```bash
choco install golang
go env -w GOPROXY=https://goproxy.cn #这一步是翻墙
## Create a folder
go mod init YOUR_MODULE_NAME
```

### Hello World Programme  

Create a folder name ```chapter_1```

```go
package main

import (
	"fmt"
)

func main() {
	fmt.Println("Hello World")
}
```

build and run  

```bash
go build .\chapter_1\aSourceFile.go
.\aSrouceFile.exe

> Hello World
```

注意naming convention 不应该是 ```aSourceFile.go``` 应该是 ```source_file.go```  
如果不想compile就启动的话

```bash
go run source_file.go

> Hello World
```

### STDOUT

optput:  

```go
fmt.Println(s1,s2) == fmt.Print(s1, " ", s2, "\n")
```

### Variable

The official name for `:=` is the short assignment statement.

### Command Line Argument 

```go
func main() { 
	if len(os.Args) == 1 {
		fmt.Println("Please give one or more floats.") os.Exit(1)
	} 
	arguments := os.Args
	min, _ := strconv.ParseFloat(arguments[1], 64)
	max, _ := strconv.ParseFloat(arguments[1], 64)
```

argument[0] = programme name  
argumeent[1..] = arguments in string form

## Chapter 2 Understanding Go Internals

## Compiler

To compile go programm

`go tool compile test.go`  
`go tool compile -pack test.go` -> you will get an archive file instead of an object file, an archive file is used to group multiple files

## GC  

To observe memory statistics  

```go
var mem runtime.MemStats 
runtime.ReadMemStats(&mem)
fmt.Println("mem.Alloc:", mem.Alloc)
fmt.Println("mem.TotalAlloc:", mem.TotalAlloc)
fmt.Println("mem.HeapAlloc:", mem.HeapAlloc)
fmt.Println("mem.NumGC:", mem.NumGC)
fmt.Println("-----")
```


Go uses Tricolor Sweeping Algo to carry out GC: The objects of the black set are guaranteed to have no pointers to any object of the white set; Grey color set might have reference to white set.

首先color **ROOT** reference to grey -> The roots are the objects that can be directly accessed by the application, which includes global variables and other things on the stack. -> pick grey变成黑色 -> 递归寻找黑色的dependent改成灰色（如果是白色的话）-> 直到所有的灰色都被遍历过就okleh -> 回收白色

## Using C Languang

```go
package main 

//#include <stdio.h>
//void callC() {
//	printf("Calling C Code!/n")
//} 

import "C"
import "fmt" 

func main() {  
	fmt.Println("A Go statement!")   
	C.callC()  
	fmt.Println("Another Go statement!")
}
```


## DEFER

```go
# 1 2 3
func d1() {
	for i := 3; i > 0; i-- { 
		defer fmt.Print(i, " ")
	}
}

# 0 0 0
func d2() { 
	for i := 3; i > 0; i-- { 
		defer func() {
			fmt.Print(i, " ") 
		}() 
	} 
	fmt.Println()
}

# 1 2 3
func d3() { 
	for i := 3; i > 0; i-- { 
		defer func(n int) { 
			fmt.Print(n, " ")
		}(i) 
	}
}
```

`defer` keyword is last in first out. 