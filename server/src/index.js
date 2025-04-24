// 变量别名
let fs = require("fs");
if (fs.existsSync("./test.js")) {
  require("../test.js");
}

const moduleAlias = require("module-alias");
moduleAlias.addAlias("@", __dirname);
let dotenv = require("dotenv");
dotenv.config({
  path: `.env.${process.env.NODE_ENV}`, // 配置文件路径
});
let Koa = require("koa");
const app = new Koa();
let { getAllRouter } = require("lodash-toolkit");
let staticFiles = require("koa-static");
let path = require("path");

//测试环境限制
const testEnvMiddleware = require("@/modules/test");

let Body = require("koa-bodyparser");
let cors = require("@koa/cors");
app.use(staticFiles("public"));
app.use(cors());
app.use(Body());
app.use(testEnvMiddleware);

(async () => {
  (await getAllRouter(path.join(__dirname, "./routes"))).forEach(item => {
    app.use(require(item).routes());
  });
})();

const port = 3456;
const http = require("http");
const server = http.createServer(app.callback()); //包装app保证http和socket监听同一端口
module.exports = {
  server,
};

server.listen(port, function () {
  console.log(`
    项目运行于: ${port} 端口,代写毕设、项目、课设、论文。QQ:1974109227微信:webzhizuo
     `);
});
