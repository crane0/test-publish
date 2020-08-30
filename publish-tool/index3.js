const http = require('http')
const fs = require('fs')

let filename = './dnf.png'

fs.stat(filename, (error, stat) => {
  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/?filename=dnf.png',
    method: 'POST',
    headers: {
      // 流式数据，https://blog.csdn.net/wangjun5159/article/details/49644507
      'Content-Type': 'application/application/octet-stream',
      'Content-Length': stat.size
    }
  };

  const req = http.request(options, (res) => {
    console.log(`状态码: ${res.statusCode}`);
    console.log(`响应头: ${JSON.stringify(res.headers)}`);
    // res.setEncoding('utf8');
    // res.on('data', (chunk) => {
    //   console.log(`响应主体: ${chunk}`);
    // });
    // res.on('end', () => {
    //   console.log('响应中已无数据');
    // });
  });

  req.on('error', (e) => {
    console.error(`请求遇到问题: ${e.message}`);
  });

  let readStream = fs.createReadStream(filename)
  readStream.pipe(req)
  readStream.on('end', () => {
    req.end();
  })
})
