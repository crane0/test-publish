const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res) => {
  let matched = req.url.match(/filename=([^&]+)/);
  let filename = matched && matched[1]
  if (!filename) {
    return
  }

  let writeStream = fs.createWriteStream('../server/public/' + filename);
  req.pipe(writeStream)
  // pipe 相当于下面2个函数的简写
  // req.on('data', trunk => {
  //   writeStream.write(trunk)
  // })
  // req.on('end', trunk => {
  //   writeStream.end(trunk)
  // })

  // 必须要pipe 等到结束，才能 res.end，否则可能流式写入一半时就结束了。
  req.on('end', () => {
    res.writeHead(200, { 'Content-Type': 'text/plain'})
    res.end('ok')
  })
})

server.listen(3000, () => {
  console.log('服务器已启动，监听端口号为 3000')
})