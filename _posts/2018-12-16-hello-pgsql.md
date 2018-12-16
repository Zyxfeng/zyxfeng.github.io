---
layout: post
title: PostgreSQL安装过程
keywords: Database Postgresql Programming 
description: PostgreSQL在Windows10下的安装过程记录
date: 2018-12-16 16:19:20.000000000 +09:00
tags: [windows10, database, postgresql]
---

## 下载安装包
1. [PostgreSQL官网](https://www.postgresql.org/)下载`windows`对应版本的二进制文件
2. 双击`postgresql`的`exe`文件，按照安装提示`step by step`进行安装

## 添加用户
1. 添加`windows`系统用户`postgres`,用于启动`PostgreSQL`的`Windows`服务
```
net user postgres pgsqlpw /add /expires:never /passwordchg:no
```

2. 并设置此用户不允许本地登录
```
net localgroup users postgres /del
```

3. 赋予`postgres`用户访问`PostgreSQL`安装目录的权限
```
cacls D:\usr\postgresql /T /E /P postgres:R
```
4. 初始化`postgres`用户，管理员账号下为`postgres`用户添加密码
```
net user postgres xxxfeng
```

>补充：windows下可用`net user postgres /del`删除用户

## 初始化数据库
1. 设置环境变量
```
PG_HOME = D:\usr\postgresql
PGDATA = D:\usr\postgresql\data
PGHOST = localhost
PATH = D:\usr\postgresql\data\bin
```

2. 执行初始化命令
```
initdb -D D:\usr\postgresql\data --locale=C -U postgres -W
```

3. 启动数据库
```
pg_ctl -l logfile start
```

4. 停止数据库
```
pg_ctl stop
```
## 注册`PostgreSQL`为`Windows`系统服务
```
pg_ctl register -D D:\usr\postgresql\data -N PostgreSQL
```

以系统服务的方式启动postgresql
```
net start PostgreSQL
```

连接`postgresql`
```
psql -d dbname -U postgres -W
```

## `Postgres`操作
1. 添加用户
```
CREATE USER craig WITH PASSWORD 'password';
```
2. 新建一个数据库
```
CREATE DATABASE pgguide
```
3. 把新创建的数据库的访问权限赋予上面创建的用户
```
GRANT ALL PRIVILEGES ON DATABASE pgguide to craig
```

> `craig`用户得到了`pgguide`数据库的所有的权限，可选择分配的权限有：**SELECT**、**INSERT**、**UPDATE**、**DELETE**、**RULE**、**REFERENCES**、**TRIGGER**、**CREATE**、**TEMPORARY** and **USAGE**.

