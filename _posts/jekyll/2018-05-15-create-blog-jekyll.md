---
layout: post
title: 使用Jekyll在GitHub上搭建个人博客
keywords: jekyll, github
description: 使用Jekyll在GitHub上搭建个人博客
date: 2018-05-15 21:14:00.000000000 +09:00
tags: [jekyll, github]
---
### Jekyll介绍：

jekyll是一个使用Ruby编写的静态站点生成工具，使用Liquid模板渲染引擎，支持Markdown和Textile标记语言，并且可以为所有以 .html、.markdown、.textile扩展名结尾的文件使用YAML配置，内置语法高亮功能。
而Github的Pages服务可以为每个Github主机上的仓库提供静态页面服务，并且Pages服务支持jekyll。因为Github Pages有两种Pages，分别是用户页面和项目页面，所以我们可以使用用户页面来创建自己的Blog。

### 准备工作
+ 在GitHub上新建一个名为`username.github.io`的仓库
+ 在windows上安装 **Jekyll**
>1. 在[https://rubyinstaller.org/downloads/](https://rubyinstaller.org/downloads/)上下载相应的Ruby+Devkit版本的安装包
>2. 双击文件，勾选`Add Ruby executables to your PATH`，然后点击`install`，等待安装完成
>3. 打开命令行输入`gem install jekyll`就可以了，它会自动安装依赖
>4. 输入命令`jekyll --version`即可查看Jekyll的版本

### 创建项目目录结构

```
.
  |-- _includes
  |-- _drafts
      |-- begin-with-the-crazy-ideas.textile
      |-- on-simplicity-in-technology.markdown
  |-- _layout 
  |   |-- default.html
  |   |-- post.html
  |-- _post
  |   |-- yyyy-mm-dd-title.markdown
  |   |-- yyyy-mm-dd-title.markdown
  |-- _sass
      |-- style.scss
  |-- _site
  |-- assets
      |-- images
  |-- _config.yml
  |-- index.html
```
> **Note：** 这个目录可根据[官网](http://jekyllcn.com/docs/structure/)自行配置

### 配置文件

+ **_includes**存放你需要在模板文件中包含的文件，你可以使用Liquid标签 `{‰ include file.ext ‰} `来引用相应的文件。

+ **_drafts**存放草稿，即未发布的文章

+ **_layout**存放布局模板

+ **_post**存放文章列表，文件命名一定要遵循 yyyy-mm-dd-title.markdown 规则

+ **_sass**存放sass样式文件，Jekyll支持sass预编译引擎

+ **_site**自动生成的，所以可以忽略，如果你有在本地安装jekyll并预览了的话，可以使用.gitignore设置Git停止对本目录的跟踪。

+ **assets**存放静态资源，如images，css，js，font等

+ **_config.yml**是主配置文件，设置经常使用的配置选项，这样在本地启动预览时就不用每次都手动输入了。

+ **index.html 和所有的 HTML/Markdown/Textile 文件** 所有的HTML/Markdown/Textile文件都可以包含 YAML 配置，这类文件都会被jekyll解析。
你可以根据自己的需求做出相应的配置，也可以`clone`别人的仓库，然后修改

### 本地预览

打开命令行，进入项目主目录执行以下命令
```bash
jekyll server
```
然后在浏览器中打开`http://127.0.0.1:4000`进行预览

### 提交到GitHub

确认无误后，提交代码
```sh
git add xxx
git commit -m "xxx"
git remote add origin git@github.com:username/username.github.io.git #关联你在前面创建的GitHub仓库
git push -u origin master #推送代码
```

### 参考内容

+ [http://jekyllcn.com/](http://jekyllcn.com/)
+ [http://pages.github.com/](http://pages.github.com/)
+ [https://github.com/onevcat/vno-jekyll](https://github.com/onevcat/vno-jekyll)
+ [http://liuyanwei.jumppo.com/2014/02/12/how-to-deploy-a-blog-on-github-by-jekyll.html](http://liuyanwei.jumppo.com/2014/02/12/how-to-deploy-a-blog-on-github-by-jekyll.html)
+ [http://justjavac.com/jekyll/2012/04/05/use-jekyll-build-blog-on-github.html](http://justjavac.com/jekyll/2012/04/05/use-jekyll-build-blog-on-github.html)