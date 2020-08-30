const http = require('http')
const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/?filename=x.html',
}

http.get(options, (res) => {
  // 用响应做些事情。
});