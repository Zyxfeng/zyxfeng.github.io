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
JavaScript调用函数时，按顺序传入参数即可。
#### 1. 作为值的函数
>因为ECMAScript中的函数名本身就是变量，所以函数也可以作为值来使用。也就是说，不仅可以像传递参数一样把一个函数传递给另一个函数，而且可以将一个函数作为另一个函数的结果返回。

```js
function callSomeFunction(someFunction, someArgument) {
    return someFunction(someArgument);
}
function add10(num) {
    return num + 10;
}
var result1 = callSomeFunction(add10, 10);
console.log(result) //20
function getGreeting(name) {
    return "Hello, " + name;
}
var result2 = callSomeFunction(getGreeting, 'Nicholas');
console.log(result2) //Hello, Nicholas
```

#### 2. 函数的内部属性
在函数的内部，有两个特殊的对象：分别是`arguments`和`this`。
>- `arguments`对象是一个类数组对象，在函数体内可以通过这个`arguments`对象来访问参数数组，从而获得传递给函数的每一个参数。通过访问`arguments`对象的`length`属性可以获知一共有多少个参数传递给了函数

```js
function doAdd() {
    if (arguments.length === 1) {
        alert(arguments[0] + 10);
    } else if (arguments.length === 2) {
        alert(arguments[0] + arguments[1]);
    }
}
doAdd(10); //20
doAdd(10, 20); //30
```
>- 函数内部的另一个特殊对象是`this`，`this`引用的是函数执行的环境对象。

```js
window.color = 'red';
var o = { color: 'blue' };
function sayColor() {
    alert(this.color);
}
sayColor(); //"red"
o.sayColor = sayColor;
o.sayColor(); //"blue"
```

#### 3. 函数的作用域
如果一个变量在函数体内部声明，则该变量的作用域为整个函数体，在函数体外部不能引用该变量。如果两个不同的函数各自声明了同一个变量，那么该变量只在各自的函数体内起作用。即不同函数内部的同名变量互相独立，互不影响。
```js
function foo() {
    var x = 1;
    x = x + 1;
}
console.log(x) //ReferenceError: 无法在函数体外引用该变量
function bar() {
    var x = 'A';
    x = x + 'B';
}
```
由于JavaScript函数可以嵌套使用，内部函数可以访问外部函数的定义的变量，反过来则不行。
```js
function foo() {
    var x = 1;
    function bar() {
        var y = x + 1; //bar可以访问外部函数foo的变量x
    }
    var z = y + 1; //ReferenceError: foo不能访问内部函数bar的变量y
}
```
如果内部函数定义了与外部函数重名的变量，则内部函数的变量将“屏蔽”外部函数的变量。
```js
function foo() {
    var x = 1;
    function bar() {
        var x = 'A';
        console.log('x in bar() = ' + x); //'A'
    }
    console.log('x in foo() = ' + x); //1
    bar();
}
foo();
```

#### 4. 函数属性和方法
因为函数是对象，所以函数也有属性和方法。
>- 每个函数都包含两个属性：`length`和`prototype`。其中`length`属性表示函数希望接收的命名参数的个数。`prototype`属性是保存**ECMAScript**中引用类型所有实例方法的所在。即诸如`toString()`和`valueOf`等方法实际上都保存在`prototype`名下，只不过需要通过各自对象访问。

>- 每个函数都包含两个非继承而来的方法：`apply()`和`call()`。这两个方法的用途都是在特定的作用域中调用函数，也就是设置函数体内`this`对象的值。`apply()`方法接收两个参数：一个是在其中运行函数的作用域；另一个是参数数组，也可以是类数组对象如`arguments`。`call()`方法与`apply()`方法的作用相同，区别仅仅在于接收参数的方式不同。对于`call()`方法而言，第一个参数是`this`值没有变化，变化的是其余参数都是直接传递给函数，即传递给函数的参数必须逐个列举出来。

```js
function sum(num1, num2) {
    return num1 + num2;
}
function callSum1(num1, num2) {
    return sum.apply(this, arguments); //传入arguments对象
}
alert(callSum1(10, 10)); //20
function callSum2(num1, num2) {
    return sum.call(this, num1, num2);
}
alert(callSum2(10, 10)); //20
```
