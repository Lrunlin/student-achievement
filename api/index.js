const express = require("express");
const app = express();
// 资源跨域
const cors = require("cors");
app.use(cors());
// 接收post请求
var bodyParser = require("body-parser");
var { getAllRouter } = require("node-db-mysql");
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

// 文件上传包
const fileUpload = require("express-fileupload");
app.use(fileUpload());

app.use("/excel", express.static("excel"));

(async () => {
  (await getAllRouter("./routes")).forEach(item => {
    app.use(require(item));
  });
})();

const port = 6789;
app.listen(port, () => console.log(`监听端口:${port}`));
