let Router = require("koa-router");
const sign = require("@/modules/signToken");
let db = require("@/db");
let router = new Router();

router.post("/sign/:auth", async ctx => {
  try {
    // 获取身份类型：admin, student, teacher
    const authType = ctx.params.auth;

    let query = "";
    let params = [];

    // 根据身份类型构建查询语句和参数
    if (authType === "admin") {
      query = `SELECT * FROM admin WHERE id=? AND password=?`;
      params = [ctx.request.body.username, ctx.request.body.password];
    } else if (authType === "student") {
      query = `SELECT * FROM student WHERE id=? AND password=?`;
      params = [ctx.request.body.username, ctx.request.body.password]; // 学号和密码
    } else if (authType === "teacher") {
      query = `SELECT * FROM teacher WHERE id=? AND password=?`;
      params = [ctx.request.body.username, ctx.request.body.password]; // 教师ID和密码
    } else {
      ctx.body = { success: false, message: "无效的身份类型" };
      return;
    }

    // 执行查询
    let [res] = await db.query(query, params);

    // 如果有结果，说明验证成功
    if (res.length) {
      const user = res[0];
      let token = sign({
        id: user.id,
        username: user.username || user.name, // 用户名可以是 'username' 或 'name'
        type: authType, // 记录身份类型
      });

      ctx.body = {
        success: true,
        message: "登录成功",
        data: { id: user.id, username: user.username || user.name },
        token: token,
      };
    } else {
      ctx.body = { success: false, message: "用户名或密码错误" };
    }
  } catch (error) {
    console.log(error);

    ctx.body = { success: false, message: "登录失败，请稍后再试" };
  }
});

module.exports = router;
