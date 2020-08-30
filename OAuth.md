# OAuth

权限登录

把发布系统，变成有权限的系统，还要有白屏操作。

用 github 的 api 做一个 OAuth 登录认证

# 1, github 的 app

## 1.1，创建

Settings/Developer setting/Github apps，创建即可。

![image](./image/o1.png)
![image](./image/o2.png)

callBack URL 和 下面第一步中的 redirect_uri 要一致。

![image](./image/o3.png)
![image](./image/o4.png)
![image](./image/o5.png)


其他默认。

得到下面的东西，用于鉴权。

![image](./image/o6.png)

点击下面的按钮，会跳转到 callbackurl
![image](./image/o7.png)


## 1.2，开始

[整体步骤](https://developer.github.com/apps/building-oauth-apps/authorizing-oauth-apps/)


第一步

Request a user's GitHub identity

发送请求换 code

客户端做，publish-tool 唤起浏览器

> 不同操作系统，唤起浏览器的命名不同

```
// mac

open 'http://xxxx'
```


注意，特殊字符需要转义，
```
encodeURIComponent('http://localhost:8080')
"http%3A%2F%2Flocalhost%3A8080"
```

```
https://github.com/login/oauth/authorize?
client_id=Iv1.a93d8ce06cc1d865&
redirect_uri=http%3A%2F%2Flocalhost%3A8080&
scope=read%3Auser&
state=abc123
```
返回 `http://localhost:8080/?code=e4a2c37e3edc398dc65d&state=abc123`

这个 code 相当于一个入场券，用于换 token（因为 token 不能带在 url 中）

state 也会带着，防止跨站攻击。

第二步

服务器做，publish-server

Users are redirected back to your site by GitHub

用 code 发送请求换 access_token

> 因为会有跨域问题，所以下面的代码放到 https://github.com 相关页面下执行才可以。

```
/* 
  code 可能会过期，需要重新请求
*/
let client_id = 'Iv1.a93d8ce06cc1d865'
let client_secret = '3b410e8c677f37eb65c9d252134a5c5b82554585'
let code = '0c906b335c0dd18d90d2'
let redirect_uri = 'http%3A%2F%2Flocalhost%3A8080'
let state = 'abc123'

let params = `client_id=${client_id}&client_secret=${client_secret}&code=${code}&redirect_uri=${redirect_uri}&state=${state}`

let xhr = new XMLHttpRequest
xhr.open('POST', `https://github.com/login/oauth/access_token?${params}`, true)
xhr.send(null)
xhr.addEventListener('readystatechange', function(event) {
  if (xhr.readyState === 4) {
    console.log(xhr.responseText)
  }
})
```

第三步

客户端/服务端，都可以。publish-tool/publish-server

Use the access token to access the API

拿到 access_token 后，就可以请求相关 api，比如获取 user 的信息

```
let xhr = new XMLHttpRequest
xhr.open('GET', `https://api.github.com/user`, true)
xhr.setRequestHeader('Authorization', 'token a26d38d4f7e5a37c55aad1a4413d1d7b25c84c68')
xhr.send(null)
xhr.addEventListener('readystatechange', function(event) {
  if (xhr.readyState === 4) {
    console.log(xhr.responseText)
  }
})
```