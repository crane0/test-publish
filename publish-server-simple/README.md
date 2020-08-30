因为 publish-server 项目使用的 express，暂时无法实现流式写入，所以先用这个项目使用 node 简单原生实现。

1，`index.js` 测试单个文件的流式传输。

也就是说，如果在 publish-tool 项目中，传递的是一个压缩包，那写到 server 项目中的，也是压缩包。

2，`index2.js` 可以直接将压缩包解压后，写入 server 项目。