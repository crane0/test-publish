const http = require('http')
const unzipper = require('unzipper')

const server = http.createServer((req, res) => {
  let writeStream = unzipper.Extract({ path: '../server/public' })
  req.pipe(writeStream)

  // 必须要pipe 等到结束，才能 res.end，否则可能流式写入一半时就结束了。
  req.on('end', () => {
    res.writeHead(200, { 'Content-Type': 'text/plain'})
    res.end('ok')
  })
})

server.listen(3000, () => {
  console.log('服务器已启动，监听端口号为 3000')
})