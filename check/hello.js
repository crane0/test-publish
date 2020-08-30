// 下面都是 phantomjs 官网给的例子 https://phantomjs.org/quick-start.html

// console.log('Hello, world!');
// phantom.exit();

var page = require('webpage').create();
page.open('http://localhost:8080', function(status) {
  console.log("Status: " + status);
  if(status === "success") {
    // 可以将当前网站页面生成一个图片。
    // page.render('baidu.png');

    // 页面 title 标签的内容
    // var title = page.evaluate(function() {
    //   return document.title;
    // });

    var title = page.evaluate(function() {
      return document.body;
    });
    console.log(title)
  }
  phantom.exit();
});