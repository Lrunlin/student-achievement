let Router = require("koa-router");
let router = new Router();

router.get("/", async ctx => {
  ctx.body = `
  <style>*{text-align:center;}</style>
  <h1>
    Koa server
  </h1>
  <div>代写毕设、项目、课设、论文。
QQ:1974109227
微信:webzhizuo

详情见README.md</div>
  `;
});
module.exports = router;
