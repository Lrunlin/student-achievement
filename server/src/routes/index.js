let Router = require("koa-router");
let router = new Router();

router.get("/", async ctx => {
  ctx.body = `
  <style>*{text-align:center;}</style>
  <h1>
    Koa server
  </h1>
  `;
});
module.exports = router;
