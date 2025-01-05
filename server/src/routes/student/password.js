const Router = require("koa-router");
const db = require("@/db"); // 数据库查询模块
const router = new Router();
const auth = require("@/modules/auth"); // 权限模块

router.put("/student-password", auth(["s"]), async ctx => {
  const teacherId = ctx.id; // 从认证信息中获取教师ID
  const { password } = ctx.request.body;

  // 校验请求参数
  if (!password) {
    ctx.body = { success: false, message: "新密码不能为空" };
    return;
  }

  try {
    // 更新教师密码
    const updatePasswordQuery = `
      UPDATE student 
      SET password = ?, create_time = NOW() 
      WHERE id = ?;
    `;
    const result = await db.query(updatePasswordQuery, [password, teacherId]);

    if (result.affectedRows === 0) {
      ctx.body = { success: false, message: "未找到指定学生" };
      return;
    }

    ctx.body = { success: true, message: "密码修改成功" };
  } catch (error) {
    console.error(error);
    ctx.body = { success: false, message: "密码修改失败，请稍后再试" };
  }
});

module.exports = router;
