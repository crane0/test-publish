var express = require('express');
var router = express.Router();
const fs = require('fs')

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req)
  // fs.writeFileSync('./1.html', 'hello html')
  res.render('index', { title: 'Express' });
});

module.exports = router;
