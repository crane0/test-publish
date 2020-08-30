整个项目用于发布内容。

1，publish-tool 项目，模拟内网的请求。

2，publish-server 项目接收内网开发的请求 (比如 publish-tool 的请求)，相当于是内容发布服务器。

> publish-server-simple 项目和 publish-server 项目作用一样，不过使用的是流式传输。

3，server 项目，就是对外提供服务的（用户访问的），也就是一般意义上的服务器。

> publish-server 项目接受请求后，会在 server 项目的 public 目录下，生成对应的内容。

# 1，整体流程

先启动 publish-server（publish-server-simple）项目，

再启动 publish-tool 项目后，就可以运行访问 publish-server 项目了，成功时会在 server 项目中生成内容。

启动 server 项目后，就可以访问在 public 目录下生成的内容了。
