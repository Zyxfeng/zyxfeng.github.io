---
layout: post
title: JavaScript常见的设计模式
keywords: javascript, OOP, Design Pattern
description: JavaScript
date: 2018-12-07 17:42:09.000000000 +09:00
tags: [JavaScript, Program, Design Pattern]
---

## 零、 Sington Mode
> 单例模式：保证一个类仅有一个实例，并提供一个访问它的全局访问点
```js
class Singleton {
  constructor(age) {
    this.age = age;
  }
  static getInstance(age) {
    const Singleton['instance'] = Symbol.for('instance');
    if (!Singleton['instance']) {
      Singleton['instance'] = new Singleton(age);
    }
    return Singleton['instance'];
  }
}
```

## 一、Strategy Mode
> 策略模式：定义一系列算法，并把它们一个个封装起来，并且使它们可以互相替换

策略模式的核心是整个分为两个部分
- 第一部分是策略类，封装具体的算法
- 第二部分是环境类，负责接收客户的请求并派发到策略类

```js
/** 解决魔术字符串 **/
const strategyTypes = {
  S: Symbol.for('S'),
  A: Symbol.for('A'),
  B: Symbol.for('B'),
}
/** 策略类 */
const strategies = {
  [strategyTypes.S](salary) {
    return salary * 4;
  },
  [strategyTypes.A](salary) {
    return salary * 3;
  },
  [strategyTypes.B](salary) {
    return salary * 2;
  }
}
/** 环境类 */
const calculateBonus = function (level, salary) {
  return strategies[level](salary);
}
```

## 二、Proxy Mode
> 代理模式：为一个对象提供一个代用品或占位符，以便控制对它的访问
- 虚拟代理
```js
/** demo: Image preload */
const myImg = (function () {
  const imgNode = document.createElement('img');
  document.body.appendChild(imgNode);
  return function (src) {
    imgNode.src = src;
  }
}());
const ProxyImage = (function () {
  const img = new Image;
  img.onload = function () {
    myImg(this.src);
  }
  return function (src) {
    myImg('./loading.gif');
    img.src = src;
  }
}());
proxyImage('./test.jpg');
```
- 缓存代理
```js
/** demo */
const mult = function () {
  let a = 1;
  for (let i = 0, l = arguments.length; i < l; i++) {
    a *= arguments[i];
  }
  return a;
}

const proxyMult = (function ()  {
  const cache = {};
  return function () {
    const args = Array.prototype.join.call(arguments, ',');
    if (args in cache) {
      return cache[args];
    }
    return cache[args] = mult.apply(this, arguments);
  }
}());
```
## 三、Observer Mode
> 观察者模式：又叫发布-订阅模式，它定义对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都将得到通知。在`JavaScript`开发中，我们一般用事件模型来替代传统的观察者模式
- `DOM`事件
```js
document.body.addEventListener('clcik', funtion () {
  alert('I had been clcik.');
})
```
- 自定义事件
```js
class Event {
  constructor() {
    this.eventListObj = {};
  }
  static getIntance() {
    const instance = Symbol.for('instance');
    if (!Event[instance]) {
      Event[instance] = new Event();
    }
    return Event[instance];
  }
  listen(key, fn) {
    if (!this.eventListObj[key]) {
      this.eventListObj[key] = [];
    }
    this.eventListObj[key].push(fn);
  }
  trigger(key, ...args) {
    const fns = this.eventListObj[key];
    if (!fns || fns.length === 0) {
      return false;
    }
    fns.forEach(fn => {
      fn.apply(this, args);
    })
  }
  remove(key, fn) {
    let fns = this.eventListObj[key];
    if (!fns) {
      return false;
    }
    if (!fn) {
      fns && (fns.length = 0);
    } else {
      for (let i = 0; i < fns.length; i++) {
        const f = fns[i];
        if (f === fn) {
          fns.splice(i, 1);
        }
      }
    }
  }
}
const event = Event.getInstance();
const add = function (a, b) {
  console.log(a + b);
}
const minus = function (a, b) {
  console.log(a - b);
}
event.listen('add', add);
event.listen('minus', minus);
event.trigger('add', 1, 3);
evnet.trigger('minus', 3, 1);
console.log('------------before remove add function: ');
console.log(event);
event.remove('add', add);
console.log('------------after remove add function: ');
console.log(event);
```

## 四、Template Mode
> 模板方法模式是一种只需要使用继承就可以实现的的模式，由两部分结构组成，第一部分是抽象父类，第二部分是具体的实现子类  
> 通常在抽象父类中封装了子类的算法框架，包括实现一些公共方法以及封装子类中所有方法的执行顺序。子类通过继承这个抽象类，也继承了整个算法结构，并且可以选择重写父类的方法.
```js
class Beverage {
  init() {
    this.boilWater();
    this.brew();
    this.pourInCup();
    if (this.customerWantsCondiments()) {
      this.addCondiments();
    }
  }
  boilWater() {
    console.log('Boil the Water');
  }
  brew() {
    throw new Error('brew function must override in child.');
  }
  pourInCup() {
    throw new Error('pourInCup function must override in child.');
  }
  addCondiments() {
    throw new Error('addCondiments function must override in child');
  }
  customerWantsCondiments() {
    return true;
  }
}
class Coffee extends Beverage {
  brew() {
    console.log('boil the coffee with water.');
  }
  pourInCup() {
    console.log('Put the coffee in a cup.');
  }
  addCondiments() {
    console.log('Add some sugre and milk.');
  }
  customerWantsCondiments() {
    return false;
  }
}
new Coffee().init();
```
## 五、Decorator Mode
> 装饰者模式：给对象动态的增加职责的方式  
装饰函数
```js
let add = function (a, b) {
  console.log(a + b);
}
// before the execute function
Function.prototype.before = function (beforeFn) {
  const self = this;
  return function (...args) {
    beforeFn.apply(this, args);
    return self.apply(this, args);
  }
}
// after the execute function
Function.prototype.after = function (afterFn) {
  const self = this;
  return function (...args) {
    const result = self.apply(this, age);
    afterFn.apply(this, args);
    return result;
  }
}
//decorate add function
add = add.before(function () {
  console.log('before add');
}).after(function () {
  console.log('after add');
});
add(1, 2);
```
## 总结
设计模式就好像招式路数，掌握了`JavaScript`的基本知识后学会一些设计模式可以对代码进行相应的优化，比如解耦，提升性能，工程化项目。