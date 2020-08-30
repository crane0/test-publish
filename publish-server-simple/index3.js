const http = require('http')
const https = require('https')
const unzipper = require('unzipper')

const server = http.createServer((req, res) => {
  if (req.url.match(/^\/auth/)) {
    return auth(req, res)
  }
  // /favicon 会自动请求，这里做拦截，否则走到下面的 unzipper 逻辑会报错。
  if (!req.url.match(/^\/?/)) {
    res.writeHead(404, {
      'Content-Type': 'text/plain',
    })
    res.end('not found')
    return
  }

  const options = {
    hostname: 'api.github.com',
    port: 443,
    path: '/user',
    method: 'GET',
    headers: {
      Authorization: 'token ' + req.headers.token,
      "User-Agent": 'crane-publish'
    }
  }
  const request = https.request(options, (response) => {
    // 因为用户信息较多，会分包。
    let body = ''
    response.on('data', (d) => {
      body += d.toString()
    })
    response.on('end', () => {
      let user = JSON.parse(body)
      console.log(user)
      // 这里根据 user的信息，做权限检查。
      let writeStream = unzipper.Extract({ path: '../server/public' })
      req.pipe(writeStream)

      // 必须要pipe 等到结束，才能 res.end，否则可能流式写入一半时就结束了。
      req.on('end', () => {
        res.writeHead(200, { 'Content-Type': 'text/plain'})
        res.end('ok')
      })
    })
  })

  request.on('error', (e) => {
    console.log(e)
  })
  request.end()
})

server.listen(8080, () => {
  console.log('服务器已启动，监听端口号为 8080')
})

function auth(req, res) {
  let code = req.url.match(/code=([^&]+)/)[1]
  let client_id = 'Iv1.a93d8ce06cc1d865'
  let client_secret = '3b410e8c677f37eb65c9d252134a5c5b82554585'
  let redirect_uri = encodeURIComponent('http://localhost:8080/auth')
  let state = 'abc123'

  let params = `client_id=${client_id}&client_secret=${client_secret}&code=${code}&redirect_uri=${redirect_uri}&state=${state}`

  const options = {
    hostname: 'github.com',
    port: 443,
    path: `/login/oauth/access_token?${params}`,
    method: 'POST'
  }
  const request = https.request(options, (response) => {
    response.on('data', (d) => {
      let result = d.toString().match(/access_token=([^&]+)/)
      if (result) {
        let token = result[1]
        res.writeHead(200, {
          'access_token': token,
          'Content-Type': 'text/html',
        })
        // 这一步点击的操作，也可以服务端自动完成。
        res.end(`<a href="http://localhost:8081/publish?token=${token}">publish</a>`)
      } else {
        res.writeHead(200, {
          'Content-Type': 'text/plain',
        })
        res.end('未获取 token')
      }
    })
  })

  request.on('error', (e) => {
    console.log(e)
  })

  request.end()
}