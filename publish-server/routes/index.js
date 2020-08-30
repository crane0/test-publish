var express = require('express');
var router = express.Router();
const fs = require('fs')

/* GET home page. */
router.get('/', function(req, res, next) {
  // 这里直接打印是看不到的，需要用调试工具才能看到。
  // console.log(req)
  fs.writeFileSync('../server/public/' + req.query.filename, req.body.content)
  res.render('index', { title: 'Express' });
});


router.post('/', function(req, res, next) {
  // 这里直接打印是看不到的，需要用调试工具才能看到。
  // console.log(req)
  fs.writeFileSync('../server/public/' + req.query.filename, req.body.content)
  res.send('')
  res.end('')
  // res.render('index', { title: 'Express' });
});

module.exports = router;
