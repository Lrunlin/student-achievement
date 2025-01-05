const Router = require("koa-router");
const db = require("@/db"); // 数据库查询模块
const router = new Router();
const auth = require("@/modules/auth"); // 权限模块

router.put("/admin-password", auth(["a"]), async ctx => {
  const adminId = ctx.id; // 从认证信息中获取管理员ID
  const { password } = ctx.request.body;

  // 校验请求参数
  if (!password) {
    ctx.body = { success: false, message: "新密码不能为空" };
    return;
  }

  try {
    // 更新管理员密码
    const updatePasswordQuery = `
      UPDATE admin 
      SET password = ?
      WHERE id = ?;
    `;
    const result = await db.query(updatePasswordQuery, [password, adminId]);

    if (result.affectedRows === 0) {
      ctx.body = { success: false, message: "未找到指定管理员" };
      return;
    }

    ctx.body = { success: true, message: "密码修改成功" };
  } catch (error) {
    console.error(error);
    ctx.body = { success: false, message: "密码修改失败，请稍后再试" };
  }
});

module.exports = router;
