---
layout: post
title: Webpack简单笔记
keywords: Front-End Webpack 
description: webpack概念的简单介绍
date: 2018-12-11 15:58:20.000000000 +09:00
tags: [front-end, webpack, module]
---

## 零、核心概念
> **Webpack** 是一个打包模块化 JavaScript 的工具，在 Webpack 里一切文件皆模块，通过 Loader 转换文件，通过 Plugin 注入钩子，最后输出由多个模块组合成的文件。Webpack 专注于构建模块化项目

- **Entry**: 入口，`Webpack`执行构建的第一步将从`Entry`开始，可理解为输入

- **Module**：模块，在`Webpack`里一切文件皆为模块，一个模块对应一个文件。`Webpack`会从配置的`Entry`中递归找出依赖的所有模块

- **Chunk**: 代码块，一个`Chunk`由多个模块组合而成，用于代码合并和分割

- **Loader**：模块转换器，用于把模块原内容按照需求转换成新内容。

- **Plugin**：扩展插件，在`Webpack`构建流程中的特定时机注入扩展逻辑来改变构建结果

- **OutPut**：输出结果，在`Webpack`经过一系列处理并得出最终想要的代码后的结果

>`Webpack` 启动后会从 `Entry` 里配置的 `Module` 开始递归解析 `Entry` 依赖的所有 `Module`。 每找到一个 `Module`， 就会根据配置的 `Loader` 去找出对应的转换规则，对 `Module` 进行转换后，再解析出当前 `Module` 依赖的 `Module`。 这些模块会以 `Entry` 为单位进行分组，一个 `Entry` 和其所有依赖的 `Module` 被分到一个组也就是一个 `Chunk`。最后 Webpack 会把所有 `Chunk` 转换成文件输出。 在整个流程中 `Webpack` 会在恰当的时机执行 `Plugin`里定义的逻辑

## 一、Entry
> `entry`是配置模块的入口，`entry`配置是**必填的**，若不填则将导致`Webpack`报错退出

- **context**
>`Webpack` 在寻找相对路径的文件时会以 `context` 为根目录，`context` 默认为执行启动 `Webpack` 时所在的当前工作目录

```js
module.exports = {
  context: path.resolve(__dirname, 'app')
}
```

- **Entry类型**
`Entry`类型可以是以下三种中的一种或者相互组合：

|类型|例子|含义|
|:-:|:-:|:-:|
|string|`'./app/entry'`|入口模块的文件路径，可以是相对路径|
|array|['./app/entry1', './app/entry2']|入口模块的文件路径|
|object|{a: './app/entry-a', b: ['./app/entry-b1', './app/entry-b2']}|配置多个入口，每个入口生成一个`chunk`|

- **Chunk名称**
>`Webpack` 会为每个生成的 `Chunk` 取一个名称，`Chunk` 的名称和 `Entry` 的配置有关：

1. 如果 `entry` 是一个 `string` 或 `array`，就只会生成一个 `Chunk`，这时 `Chunk` 的名称是 `main`
2. 如果 `entry` 是一个 `object`，就可能会出现多个 `Chunk`，这时 `Chunk` 的名称是 `object` 键值对里键的名称。

## 二、Output
> `output`配置如何输出最终想要的代码。`output`是一个`object`，里面包含一系列配置项

- **filename**
`output.filename`配置输出文件的名称，类型为`string`。它内置了一些变量：

|变量名|含义|
|:-:|:-:|
|id|Chunk的唯一标识|
|name|Chunk的名称|
|hash|Chunk的唯一标识的Hash值|
|chunkhash|Chunk内容的Hash值|

## 三、Module
> `moudle`配置如何处理模块。

## 四、Resolve
> `Webpack`在启动后会从配置的入口模块出发找出所有依赖的模块，`Resolve`配置`Webpack`如何寻找所对应的文件。`Webapck`如何寻找模块所对应的文件。`Webpack`内置`JavaScript`模块化语法解析功能。默认会采用模块化标准里约定好的规则去寻找，但你也可以根据自己的需要修改默认的规则

- alisa
> `resolve.alias`配置项通过别名来把原导入路径映射成一个新的导入路径

- mainFields

- extensions
> `resolve.extensions`用于配置在尝试过程中用到的后缀列表

## 五、Plugin
> `Plugin`用于扩展 Webpack 功能，各种各样的`Plugin`几乎让 Webpack 可以做任何构建相关的事情。

- 配置
> `Plugin`的配置很简单`plugins`配置项接受一个数组，数组里每一项都是一个要使用的`Plugin`的实例，`Plugin`需要的参数通过构造函数传入

```js
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');

module.exports = {
  plugins: [
    new CommonsChunkPlugin({
      name: 'common',
      chunks: ['a', 'b']
    }),
  ]
};
```

## 六、devServer
