---
author: "Brabalawuka"
title: "Interesting Golang \"Passed by Value\" & \"Passed By Pointer Value\""
date: "2021-09-08"
tags: ["学习", "Golang"]
categories: ["笔记"]
summary: "Just some insights on usage of Golang Pass By Value and Pass by Reference（Pointer）~"
ShowToc: true
TocOpen: false
cover:
    image: "cover.png"
    relative: true
---

As we all know, there are two types of variable assignments in Golang. Copy the exact value then allocate in stack and copy the reference pointer to the value and assign that to the new variable. Things like **slice, map, channel, interface and func** are copied by "pointer values" and others like ****struct, int and other primitive data types** are copied with the exact value it contains.  

The below code is easy to understand：  

```go
type MyStruct struct {
	A int
	B string
}

func UpdateStruct(s MyStruct) {
	s.A = 5
}

func NewStruct(){
	var s = MyStruct{
		A: 0,
		B: "0",
	}
	
	fmt.Printf("NewStruct: %v\n", s)
	UpdateStruct(s)
	fmt.Printf("UpdatedStruct: %v\n", s)
}
```

Apprantly, the printout is

```
NewStruct: {0 0}
UpdatedStruct: {0 0}
``` 

This is because the struct `Mysturct` is copied with its value. So, the below one should be easier to predict.

```go
func UpdateMap(m map[string]int) {
	m["one"] = 0
}

func NewMap(){
	var m = map[string]int{"one": 1, "two":2}

	fmt.Printf("NewMap: %v\n", m)
	UpdateMap(m)
	fmt.Printf("AfterReturn: %v\n", m)
}
```

Yes the printout is ↓ and this is because the `var m`'s pointer is copied and passed as parameter value

```
NewMap: map[one:1 two:2]
AfterReturn: map[one:0 two:2]
```

So since we already know slice variables will also be passing references of the slice as the parameters. Lets do a quick test on the below part, what do you think will be the print out for the `1, 2, 3, 4, 5`

```go
func UpdateSlice(s []int) {
    s[2] = 0
	fmt.Printf("PrintSlice2: %v\n", s)
	s = append(s, 8)
	fmt.Printf("PrintSlice3: %v\n", s)
	s[1] = 5
	fmt.Printf("PrintSlice4: %v\n", s)
}

func main(){
	var s = []int{1, 2, 3}
	fmt.Printf("PrintSlice1: %v\n", s)
	UpdateSlice(s)
	fmt.Printf("PrintSlice5: %v\n", s)
}
```

The answer is:

```go
PrintSlice1: [1 2 3]
PrintSlice2: [1 2 0]
PrintSlice3: [1 2 0 8]
PrintSlice4: [1 5 0 8]
PrintSlice5: [1 2 0]
```

**If your answer is right and you know why, you can go watch YouTube now~**  
For new gophers like me who sucks may wander why its like that and the golang runtime maybe can tell you.
This is because the implementation of a slice is a collection of three variable as a strut. One pointer to the internal array, one integer specifying the current length and another specifying the capacity. So a slice reference will occupy 24 bytes:

```go
var s []int
fmt.Println(unsafe.Sizeof(s)) // -> 24
```

And this is the definition in runtime: [Go Slice: Usage and Internals](https://go.dev/blog/slices-intro)

```go
type slice struct {
    array unsafe.Pointer
    len   int
    cap   int
}
```

Then to make the explanation clear we print out the address of the slice

```go
func CheckSlice(){
	utils.PrintObjectDumpTableHeader()

	var s = []int{1, 2, 3}

	utils.DumpObject("Slice1", reflect.ValueOf(&s))
	fmt.Printf("Slice1: %v\n", s)

	UpdateSlice(s)

	utils.DumpObject("Slice5", reflect.ValueOf(&s))
	fmt.Printf("Slice5: %v\n", s)
}

func UpdateSlice(s []int) {

	s[2] = 0

	utils.DumpObject("Slice2", reflect.ValueOf(&s))
	fmt.Printf("Slice2: %v\n", s)

	s = append(s, 8)

	utils.DumpObject("Slice3", reflect.ValueOf(&s))
	fmt.Printf("Slice3: %v\n", s)

	s[1] = 5

	utils.DumpObject("Slice4", reflect.ValueOf(&s))
	fmt.Printf("Slice4: %v\n", s)
}

//PrintOuts
Var                 Type        Address             RootOffset LocalOffset Size
Slice1              []int       0x000000c0000ac000           0           0   24
Slice1: [1 2 3]
Slice2              []int       0x000000c0000ac030           0           0   24
Slice2: [1 2 0]
Slice3              []int       0x000000c0000ac030           0           0   24
Slice3: [1 2 0 8]
Slice4              []int       0x000000c0000ac030           0           0   24
Slice4: [1 5 0 8]
Slice5              []int       0x000000c0000ac000           0           0   24
Slice5: [1 2 0]
```

So, when the reference of the slice array is copied to the function as parameter, these 24 bytes are copied to a new place as the slice is a basically just a struct. However, the pointer to the actual array remains the same. Therefore, updating `s[2] = 0` will amend the orginal array to `[1,2,3] -> [1,2,0]` as the new `address: 0x000000c0000ac030` is still refering to the old array. Now the following step `append` is interesting. The append action makes the slice exceeds the capacity of the old slice and therefore a new array pointer is allocated to the inner slice struct pointer `address: 0x000000c0000ac030` so its internal array pointer is now different from the outside one. Then the following `s[1] = 5` is changing the new array of the Slice S. This leads to `[1,2,0] -> [1, 5, 0, 8]` being not reflected in the original slice S where the slice is at its `0x000000c0000ac000` position.  

```go
func CheckSlice(){
	utils.PrintObjectDumpTableHeader()

	var s = make([]int, 3, 10)
	s[0] = 1
	s[1] = 2
	s[2] = 3

	...
}

func UpdateSlice(s []int) {

    ...
}

//PrintOuts
Var                 Type        Address             RootOffset LocalOffset Size
Slice1              []int       0x000000c0000ac000           0           0   24
Slice1: [1 2 3]
Slice2              []int       0x000000c0000ac030           0           0   24
Slice2: [1 2 0]
Slice3              []int       0x000000c0000ac030           0           0   24
Slice3: [1 2 0 8]
Slice4              []int       0x000000c0000ac030           0           0   24
Slice4: [1 5 0 8]
Slice5              []int       0x000000c0000ac000           0           0   24
Slice5: [1 5 0]
```  

If we preallocate the slice capacity of the slice as 10. There will be no change in the array pointer due to appending operation Append action would only amend the length of the slice from 3 -> 4. Therefore the append 8 is not shown from the outside s but the amended 5 can be shown.