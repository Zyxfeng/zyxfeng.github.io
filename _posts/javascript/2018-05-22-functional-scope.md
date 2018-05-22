---
layout: post
title: JavaScript函数相关的学习笔记
keywords: javascript, function,
description: JavaScript函数相关的学习总结
date: 2018-05-22 22:00:00.000000000 +09:00
tags: [JavaScript, Function]
---
### 函数的定义
在JavaScript中，函数实际上是对象。每个函数都是Function类型的实例，而且都与其他引用类型一样具有属性和方法。由于函数是对象，因此函数名实际上也是一个指向函数对象的指针，不会与某个函数绑定。定义函数的方式有两种：

#### 1. 函数声明
```js
function functionName(arg0, arg1, arg2) {
    //函数体
}
```
>关于函数声明，它的一个重要特征就是函数声明提升，意思是在代码运行过程中解析器在加载数据是，会率先读取函数声明，并使其在执行任何代码之前可用

#### 2. 函数表达式
```js
var functionName = function (arg0, arg1, arg2) {
    //函数体
};
```
>这种形式看起来就像是常规的变量赋值语句，即创建一个函数并将它赋值给变量functionName。这种情况下创建的函数叫做 **匿名函数** ，因为function关键字后面没有标识符，他的`name`属性是空字符串。  
>上面的两种方式是等价的，要注意的是，函数体内部的语句在执行时，一旦执行到`return`，函数就执行完毕，并将结果返回。如果没有`return`语句，函数执行完毕会返回undefined。

### 函数的调用
