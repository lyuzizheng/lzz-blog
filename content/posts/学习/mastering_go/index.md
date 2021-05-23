---
author: "LZZ"
title: "Mastering Go学习笔记"
date: "2021-05-15"
tags: ["学习", "Golang"]
categories: ["笔记"]
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

```
choco install golang
go env -w GOPROXY=https://goproxy.cn #这一步是翻墙
## Create a folder
go mod init YOUR_MODULE_NAME
```

### Hello World Programme  

Create a folder name ```chapter_1```
```
package main

import (
	"fmt"
)

func main() {
	fmt.Println("Hello World")
}
```
build and run 
```
go build .\chapter_1\aSourceFile.go
.\aSrouceFile.exe

> Hello World
```

注意naming convention 不应该是 ```aSourceFile.go``` 应该是 ```source_file.go```  
如果不想compile就启动的话

```
go run source_file.go

> Hello World
```

### STDOUT

optput:
```
fmt.Println(s1,s2) == fmt.Print(s1, " ", s2, "\n")
```

### Variable

The official name for `:=` is the short assignment statement.

### Command Line Argument 

```
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