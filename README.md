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


# 2，OAuth 对应改项目

步骤，

1，先启动 publish-server-simple/index3.js

启动一个 server 8080

2，再启动 publish-tool/index5.js 

会打开浏览器，发送一个请求，也就是[OAtuth](./OAtuth.md)中的第一步，该请求返回的结果 `http://localhost:8080/?code=e4a2c37e3edc398dc65d&state=abc123` 会再次请求 publish-server-simple/index3.js

同时会启动一个 server 8081

3，publish-server-simple/index3.js 收到请求后，发送一个请求，也就是[OAtuth](./OAtuth.md)中的第二步，拿到 access_token，

同时返回一个页面，链接是一个带 token 的请求。

4，publish-tool/index5.js 收到请求后，开始向 publish-server-simple/index3.js 发送上传内容的请求，并传递了 token

5，publish-server-simple/index3.js 收到请求后，会发送获取 user 信息的请求，得到结果进行权限验证（这里没做），通过后发布内容。