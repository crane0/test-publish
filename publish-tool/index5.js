const http = require('http')
const fs = require('fs')
// 用于将多个文件压缩在一起 https://www.npmjs.com/package/archiver
const archiver = require('archiver')
// 用于执行 linux 命令
const child_process = require('child_process')

let packname = './package'


let redirect_uri = encodeURIComponent('http://localhost:8080/auth')
// 打开浏览器访问指定链接
child_process.exec(`open https://github.com/login/oauth/authorize?client_id=Iv1.a93d8ce06cc1d865&redirect_uri=${redirect_uri}&scope=read%3Auser&state=abc123`)

const server = http.createServer((request, res) => {
  let token = request.url.match(/token=([^&]+)/)[1]
  console.log('real publish')

  const options = {
    hostname: 'localhost',
    port: 8080,
    path: '/?filename=package.zip',
    method: 'POST',
    headers: {
      'token': token,
      'Content-Type': 'application/octet-stream',
    }
  };

  const req = http.request(options, (res) => {
    console.log(`状态码: ${res.statusCode}`);
    console.log(`响应头: ${JSON.stringify(res.headers)}`);
  });

  req.on('error', (e) => {
    console.error(`请求遇到问题: ${e.message}`);
  });


  var archive = archiver('zip', {
    zlib: { level: 9 } // Sets the compression level.
  });
  archive.directory(packname, false);
  archive.finalize();
  archive.pipe(req)
  archive.on('end', () => {
    console.log('publish success')
    req.end('publish success');
    server.close()
  })
})

server.listen(8081, () => {
  console.log('服务器已启动，监听端口号为 8081')
})
