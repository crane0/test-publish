const http = require('http')
const fs = require('fs')
// 用于将多个文件压缩在一起 https://www.npmjs.com/package/archiver
const archiver = require('archiver')

let packname = './package'

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/?filename=package.zip',
  method: 'POST',
  headers: {
    // 流式数据，https://blog.csdn.net/wangjun5159/article/details/49644507
    'Content-Type': 'application/application/octet-stream',
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
  req.end();
})