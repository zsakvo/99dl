# 99dl — 九九藏书网书籍下载工具

![下载操作](https://i.loli.net/2018/09/15/5b9c8f6b480bd.gif)

## 描述

[99 藏书网](http://www.99csw.com/ "99藏书网")是一个图书阅读平台，拥有较为良好的资源以及阅读环境。但是网站自身并无任何的客户端，所以在移动设备上阅读的时候只能通过访问 wap 网页，稍显不便。本项目可以根据输入的书号（从该图书页面的 url 中获取），自动从该网站获取资源，解密出正确的顺序，并输出为电子书格式，以便获取更方便的阅读体验。

## 准备

首先你的系统需要安装有 Node.js 。

可以从官网获取相关安装包，亦可以通过仓库或者类似于[nvm](https://github.com/creationix/nvm "nvm")等脚本进行安装。

## 安装 / 更新 / 卸载

启动终端（Windows 为命令提示符或者 Powershell），执行命令

```
npm i 99dl -g
# 大陆亦可以使用 cnpm 来提高安装速度
```

如需卸载，则执行

```
npm uninstall 99dl -g
```

## 使用

直接执行命令

```
99dl -d epub/txt,bid
-d 命令为下载，后面追加参数的第一个为下载格式，支持 txt 与 epub，第二个参数为书籍 bid，你可以从网页 url 获取之。
```

书号为纯数字。以《白夜追凶》为例，其目录 Url 链接为`http://www.99lib.net/book/8558/index.htm`，则对应的书号即为`8558`。

## 配置

输入命令

```
99dl -s
```

即可进入设置页面。

目前有四个可设置项，按对应的数字进入，之后依要求输入内容，回车即可。

```
[1] Download path # 下载目录，必须设置
[2] Download thread # 下载线程数
[3] Download timeout # 下载超时
[4] Proxy # 使用代理
```

- **下载目录**  
  使用前必须先行设置，文件夹无需手动建立，下载中会自动检查并建立对应文件夹。

- **下载线程数**  
  同时获取的章节数目，范围为`1~10`，默认为`3`。并不建议将之设置的过大，否则可能会导致网站失去响应反而拖累下载速度。

- **下载超时**  
  在网站多久后没有返回内容即视为访问失败，单位毫秒，默认值为`2000`，为了稳定性的需要，自行设置需要值大于`1000`

- **使用代理**  
  在本人的测试环境下发现直接访问该网站现在并不稳定，此状况在加上代理以后得以解决。故而如果下载时频繁出错，推荐自行通过代理服务器获取资源（目前仅支持 http 代理）

## ToDo

- [ ] 同时下载多个作品
- [x] 支持输出 Epub 格式书籍
- [x] 支持 socks 代理
- [ ] 支持一定程度上的搜索功能

## 鸣谢

[pxder](https://github.com/YKilin/pxder "pxder")
