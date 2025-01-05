const Router = require("koa-router");
const db = require("@/db"); // 你的数据库模块
const auth = require("@/modules/auth"); // 你的权限验证模块

const router = new Router();

router.put("/admin/password", auth(), async ctx => {
  try {
    const { id } = ctx;
    const { password } = ctx.request.body;

    await db.query("UPDATE admin SET password = ? WHERE id = ?", [password, id]);

    ctx.body = {
      success: true,
      message: "密码修改成功",
    };
  } catch (error) {
    console.error(error);
    ctx.body = {
      success: false,
      message: "密码修改失败",
      error: error.message,
    };
  }
});

module.exports = router;
