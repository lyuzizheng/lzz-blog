---
author: "LZZ"
title: "从观察老板的面试别人说起--Weighted Random Sampling算法"
date: "2022-03-17"
tags: ["学习", "Algorithm"]
categories: ["笔记"]
summary: "前两天老板面试别人我去做了旁观，我觉得他出得题太简单了。可是后来被生生的打脸了，他说：一道好的面试题一定是深入浅出的，让面试者不断发掘更优秀的解题办法，这个过程才是Engineer的能力，而不是上来一道不负责任的翻转红黑树。"
draft: false
ShowToc: false
TocOpen: false
cover:
    image: "cover.png"
    relative: true

---

## 前调 - Easy and Relax Beginning

前两天老板面试别人我去做了旁观，我觉得他出得题太简单了。可是后来被生生的打脸了，他说：一道好的面试题一定是深入浅出的，让面试者不断发掘更优秀的解题办法，这个过程才是Engineer的能力，而不是上来一道不负责任的翻转红黑树。这道题到底是什么样子的呢？

> 你在做一款游戏，游戏需要打怪，击杀怪物会掉落宝物，宝物可能有很多种，也可能不掉宝，几率不一样但是加起来为1，题目很简单，写一个function，按照几率返回掉落的宝物。  

这个问题乍一看非常简单，其实就是一个抽奖问题，抽中金奖概率为2%，抽中银奖概率为3%，抽中铜奖为5%，然后抽不中概率为90%，那我们马上就能写一个很简单的版本出来：  

### Linear Search

```go
//Prize and Probablity (真黑心啊这几率。。。)
var prizeMap = map[string]float64{
  "gold": 0.02,
  "silver": 0.03,
  "bronze": 0.05,
  "nothing" : 0.9,
}

func luckyDraw(prizeMap map[string]float64) string{
  random := rand.Float64()
  for k, v := range prizeMap {
    if random < v {
      return k
    }
    random -= v
  }
  return "nothing"
}
```  

> 我： 算法很简单，我先把所有的candidate和对应的几率放进一个map，然后通过随机数（伪随机）生成一个小数，然后按照顺序减掉map里面的几率值，最后减不掉的就是对应的选项。  
> 老板： 这个方法的时间和空间复杂度都是多少呢？  
> 我： 空间O(n), 时间O(n), 很快了吧~  
> 老板： 嗯嗯那我要是有10万种奖品种类呢？你这个是不是有点慢啊。  
> 我：啊这。。。  
> 老板：再比如说我先在要加一个钻石奖的选项，概率为1%，其他的不变，你该怎么改数值呢？  
> 我：啊这。。。  
![委屈](image1.gif#center)  
> 老板： 你再想想  
> 我：好的




## 中调 - Engineering the way through  

> I always believe that a good software engineer should be a good product owner with user perspective -- Brabalauwka

面试中的算法题我一直非常鄙视，觉得日常生产中根本用不到。现在才发老板出的题目都别出心裁，考算法的过程中其实有很多环节都是很重要的：面试者能否清晰的定义面试官的需求（需求定义），提出一些input和output并且寻求理解是否正确（需求沟通), 快速设计算法并且沟通思路（技术评审），写出算法并且思考edge case（快速开发测试），思考更优解（维护与性能优化）。所以这道题完全满足了这个思路。  

### Binary Search  

经过一些思考我得到了以下办法：  

```go
//DataSet with weighted collection
var weightedPrizes = map[int][]string{
  1: []string{"Dyson", "iPhone"},
  2: []string{"XBox", "Switch"},
  3: []string{"Speaker", "AirPods"},
  50: []string{"nothing"},
}
//User Closure to create the function
func getLuckyDrawFunc(prizeMap map[int][]string) func()string {
  //Prepare a linear arrangement of all probabilities
  current := 0
  //Linear prizes markers
  prizeRange := make([]int, 0)
  //Actual Prizes
  actualPrizes := make([]string, 0)
  //Make prize markers
  for weight, prizes  := range prizeMap {
    for _, prize := range prizes {
      current += weight
      prizeRange = append(prizeRange, current)
      actualPrizes = append(actualPrizes, prize)
    }
  }
  rand.Seed(time.Now().UnixNano())
  //return the func that used to do lucky draw
  return func() string {
    random := rand.Intn(current+1)
    //Binary Search the prizeRange
    low := 0
    high := len(prizeRange) - 1
    for high >= low {
      mid := (low + high) / 2
      if random < prizeRange[mid] {
        high = mid - 1
      } else {
        low = mid + 1
      }
    }
    return actualPrizes[low]
  }
}
```  

为了满足方便的加减奖品池，更改几率我们使用用权重计数的map来储存奖品对应的权重，每次更改map新增或者删减奖品我们就重新生成一次里面的奖品几率。这是工程化的优化实现。同时，使用闭包来保护隐私~ 为了减少每次抽奖的时间复杂度，我们建立一个递增的奖品对应的marker，然后通过Binary Search的方法来搜索。  

>我：老板，我现在这个算法空间复杂度O(3n),准备时间为O(n log(n)), 时间复杂度O(log(n))  
>老板：不错！一般面试者写成这样我就给过了，但是还有更优解，我面试了这么多人还没有一个人写出来过。  
>我：。。。。。。我再研究研究。。。  
>老板: 这个东西叫做Weigthed Random Sampling, 我们后端用到的Load Balancer算法之一，只不过

## 后调 -- Algorithms are art, they are beautiful  

回到家后, 我思考了很久更优秀的解法，也问了朋友相关解法。最后还是不得不去CSDN学习一波。令我感触最深的是一篇文章中介绍的两种极致的算法。它们太优美了，让人不得不惊叹创造者的思想。  

### The Hopscotch Selection

### The Alias Method -- Ultimate Form