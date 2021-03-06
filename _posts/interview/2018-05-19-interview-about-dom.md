---
layout: post
title: 在浏览器输入网址按下回车之后发生了什么
keywords: browser, render, layout, reflow, repaint
description: 从浏览器发起请求到页面展示的过程
date: 2018-05-19 00:00:00.000000000 +09:00
tags: [Interview, Browser, Render]
---
### 问题引出

一个老问题了，以前看别人文章的时候发现很多前端这方面的面试都会问到这个问题，今天去面试也同样被问到这个问题了。之前也看了别人整理的回答，但还是不能够从容流利地回答出来，所以现在也来总结一下整个过程。

### 解析url
浏览器通过解析`url`获取请求信息
>+ `Protocol` "http"<br>
    &nbsp;&nbsp;使用HTTP协议
>+ 主机名和域名
>+ `Resource` "/"<br>
    &nbsp;&nbsp;请求的资源是主页(index)

### DNS查询
浏览器将主机名转换成服务器IP地址
>- 浏览器检查域名是否在缓存中
>- 如果浏览器缓存中没有，就去操作系统中查询
>- 如果操作系统中也没有这个域名的缓存记录，也没有在hosts里找到对应的记录，就向dns服务器发送查询请求

### 建立连接
浏览器得到目标服务器的IP地址，以及URL中给出的端口号后，会与目标服务器建立一条TCP连接
>- 客户端选择一个初始序列号(ISN)，将设置了SYN位的封包发送给服务器端，表明自己要建立连接并设置初始序列号
>- 服务器端接收到SYN包，如果它可以建立连接，服务器端会选择自己的初始序列号(ISN)并设置SYN位，表明自己选择了一个初始化序列号。然后把客户端的(ISN+1)复制到ACK位，表明自己接收到了客户端的第一个封包
>- 客户端通过发送一个设置了ACK位、接收端ACK+1和自己的序列号+1的封包来确认这次连接

### 请求处理
客户端向服务器端发送一条HTTP请求报文
>HTTP请求常用的方法有GET、POST、HEAD、PUT、DELETE等，直接在地址栏里输入URL使用的GET方法

服务器端接收请求，根据请求信息获取相应的响应内容
>没有指定页面的情况下，通常会默认访问路径位`/`，即会访问首页文件

服务器端会使用指定的处理程序分析处理这个文件，返回给请求者一条响应报文，然后关闭连接
>每当文档中有资源，都会重新发起一次请求，直至资源全部加载

### 浏览器渲染
浏览器端得到服务器端提供的资源(HTML、CSS、JS、图片等)之后，就开始解析这些资源并渲染页面
![WebKit主流程](/assets/images/2351517245-5972085e433ea.png)<br>
webkit内核浏览器的主要渲染流程
- HTML解析
>- HTML解析器的主要工作是对HTML文档进行解析，生成解析树。  
>- 解析树是以DOM元素以及属性为节点的树。DOM是文档对象模型(Document Object Model)的缩写，它是HTML文档的对象表示，同时也是HTML元素面向外部如JavaScript的接口。树的根部是Document对象。
>- 解析结束之后，浏览器开始加载网页的外部资源。

- CSS解析
>CSS Parser将CSS解析成Style Rules，Style Rules也叫CSSOM。与HTML Parser相似，CSS Parser作用就是将多个CSS文件中的样式合并解析出具有树形结构的Style Rules
![CSSOM树形结构](/assets/images/3760570497-573dbf4cd0b79_articlex.png)<br>
Style Rules 树形结构

- 脚本处理
> 浏览器解析文档，当遇到`<script>`标签的时候，会立即解析脚本，阻塞文档的解析，因为脚本文件可能会改动DOM和CSS<br>
> 如果脚本是外部的，会等待脚本下载完毕，再继续解析文档。可以通过在script标签上增加属性`defer`或者`async`使得脚本延迟加载。
> 脚本解析会将脚本中改变DOM和CSS的地方分别解析出来，追加到DOM Tree和Style Rules上。

- 渲染树(Render Tree)
> DOM Tree 和 Style Rules合并生成渲染树。  
> Render Tree实际是一个计算好的样式，与HTML对应的Tree

- 样式计算
> 通过累加子节点的宽度，该节点的水平内边距(padding)、边框(border)和外边距(margin)，自底向上的计算"Frame 树"中每个节点的首选(preferred)宽度。<br>
> 通过自顶向下的给每个节点的子节点分配可行宽度，计算每个节点的实际宽度。<br>
> 通过应用文字折行、累加子节点的高度和此节点的内边距(padding)、边框(border)和外边距(margin)，自底向上的计算每个节点的高度。<br>
> 使用上面的计算结果构建每个节点的坐标。
> 当存在元素使用`floated`，位置有`absolutely`，或`relativly`属性的时候，会有更多复杂的计算，详见：[http://dev.w3.org/csswg/css2/](http://dev.w3.org/csswg/css2/) 和 [http://www.w3.org/Style/CSS/current-work](http://www.w3.org/Style/CSS/current-work )

- 布局Layout
> 创建渲染树后，下一步就是布局（Layout）,或者叫回流（reflow,relayout），这个过程就是通过渲染树中渲染对象的信息，计算出每一个渲染对象的位置和尺寸，将其安置在浏览器窗口的正确位置，而有些时候我们会在文档布局完成后对DOM进行修改，这时候可能需要重新进行布局，也可称其为回流，本质上还是一个布局的过程，每一个渲染对象都有一个布局或者回流方法，实现其布局或回流。<br>
> 布局是一个从上到下，从外到内进行的递归过程，从根渲染对象，即对应着HTML文档根元素，然后下一级渲染对象，如对应着元素，如此层层递归，依次计算每一个渲染对象的几何信息（位置和尺寸）。<br>
> 每一个渲染对象的布局基本流程如下：
>> 1. 计算此渲染对象的宽度(width)；
>> 2. 遍历此渲染对象的所有子级，依次设置子级渲染对象的坐标；判断是否需要触发子渲染对象的布局或回流方法，计算子渲染对象的高度
>> 3. 设置此渲染对象的高度：根据子渲染对象的累积高，margin和padding的高度设置其高度；

- 绘制(Painting)
> 在绘制阶段，系统会遍历呈现树，并调用呈现器的`paint`方法，将呈现器的内容显示在屏幕上。绘制工作是使用用户界面基础组件完成的。  
> CSS2规范定义绘制流程的顺序。绘制的顺序其实就是元素进入堆栈样式上下文的顺序。这些堆栈会从后往前绘制。  
> **Reflow** 和 **Repaint**的区别：
> > **Repaint** ：屏幕的一部分要重画，比如某个CSS的背景色变了。但是元素的几何尺寸没有变。  
> > **Reflow** : 元件的几何尺寸变了，我们需要重新验证并计算Render Tree。是Render Tree的一部分或全部发生了变化。这就是Reflow，或是Layout。（HTML使用的是flow based layout，也就是流式布局，所以，如果某元件的几何尺寸发生了变化，需要重新布局，也就叫reflow）reflow 会从`<html>`这个root frame开始递归往下，依次计算所有的结点几何尺寸和位置，在reflow过程中，可能会增加一些frame，比如一个文本字符串必需被包装起来  
> > **Reflow** 的成本比 **Repaint** 的成本高得多的多。DOM Tree里的每个结点都会有reflow方法，一个结点的reflow很有可能导致子结点，甚至父点以及同级结点的reflow

### 页面渲染优化
浏览器对上文介绍的关键渲染路径进行了很多优化，针对每一次变化产生尽量少的操作，还有优化判断重新绘制或布局的方式等等。
在改变文档根元素的字体颜色等视觉性信息时，会触发整个文档的重绘，而改变某元素的字体颜色则只触发特定元素的重绘；改变元素的位置信息会同时触发此元素（可能还包括其兄弟元素或子级元素）的布局和重绘。某些重大改变，如更改文档根元素的字体尺寸，则会触发整个文档的重新布局和重绘，据此及上文所述，推荐以下优化和实践：
- HTML文档结构层次尽量少，最好不深于六层；
- 脚本尽量放到页脚；
- 少量首屏样式内联放在标签内；
- 样式结构层次尽量简单；
- 在脚本中尽量减少DOM操作，尽量缓存访问DOM的样式信息；
- 减少通过js代码修改元素样式，尽量使用修改class名方式操作样式或动画；
- 动画尽量使用在绝对定位或固定定位的元素上；
- 尽量缓存DOM查找，查找器尽量简洁；
- 涉及多域名的网站，可以开启域名预解析；

### 总结
浏览器渲染是个很繁琐的过程，其中每一步都有对应的算法。  
了解渲染过程原理可以有针对的性能优化，而且也可以懂得一些基本的要求和规范的原理。

### 参考连接
1. [https://www.html5rocks.com/en/tutorials/internals/howbrowserswork/](https://www.html5rocks.com/en/tutorials/internals/howbrowserswork/)
2. [https://www.html5rocks.com/zh/tutorials/internals/howbrowserswork/](https://www.html5rocks.com/zh/tutorials/internals/howbrowserswork/)
3. [https://github.com/skyline75489/what-happens-when-zh_CN/blob/master/README.rst](https://github.com/skyline75489/what-happens-when-zh_CN/blob/master/README.rst)