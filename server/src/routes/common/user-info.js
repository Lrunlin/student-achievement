let Router = require("koa-router");
const sign = require("@/modules/signToken");
let db = require("@/db");
let auth = require("@/modules/auth");
let router = new Router();

router.get("/info", auth(), async ctx => {
  try {
    // 根据 ctx.auth 获取用户身份类型
    const authType = ctx.auth;

    let query = "";
    let params = [];

    // 根据身份类型构建查询语句和参数
    if (authType === "admin") {
      query = `SELECT * FROM admin WHERE id=?`;
      params = [ctx.id];
    } else if (authType === "student") {
      query = `SELECT * FROM student WHERE id=?`;
      params = [ctx.id];
    } else if (authType === "teacher") {
      query = `SELECT * FROM teacher WHERE id=?`;
      params = [ctx.id];
    } else {
      ctx.body = { success: false, message: "无效的身份类型" };
      return;
    }

    // 执行查询
    let [res] = await db.query(query, params);

    // 如果查询到结果，返回对应的信息
    if (res.length) {
      const user = res[0];
      const userInfo = {
        id: user.id,
        username: user.username || user.name, // 对于不同身份的字段名不同，可能是 username 或 name
        auth: authType,
      };

      ctx.body = {
        success: true,
        message: "获取信息成功",
        data: userInfo,
      };
    } else {
      ctx.body = { success: false, message: "未找到相关信息" };
    }
  } catch (error) {
    ctx.body = { success: false, message: "获取信息失败，请稍后再试" };
  }
});

module.exports = router;
