let Router = require("koa-router");
let db = require("@/db");
let auth = require("@/modules/auth");
let router = new Router();

router.put("/college/:id", auth(["a"]), async ctx => {
  const { id } = ctx.params; // 获取 URL 参数中的学院ID
  const { name } = ctx.request.body; // 获取请求体中的新学院名称

  // 校验新学院名称是否为空
  if (!name) {
    ctx.body = { success: false, message: "学院名称不能为空" };
    return;
  }

  try {
    // 检查是否已有同名学院
    const [existingCollege] = await db.query(`SELECT * FROM college WHERE name = ? ;`, [
      name,
    ]);

    if (existingCollege.length > 0) {
      // 如果已存在同名学院（排除当前要修改的学院），返回错误信息
      ctx.body = { success: false, message: "学院名称已存在" };
      return;
    }

    // 更新学院名称
    const [result] = await db.query(`UPDATE college SET name = ? WHERE id = ?`, [name, id]);

    if (result.affectedRows === 0) {
      // 如果没有修改任何记录，说明未找到该学院
      ctx.body = { success: false, message: "学院ID不存在" };
      return;
    }

    // 返回成功消息
    ctx.body = {
      success: true,
      message: "学院名称更新成功",
      data: {
        id,
        name,
      },
    };
  } catch (error) {
    // 捕获异常并返回错误信息
    console.error(error);
    ctx.body = { success: false, message: "更新失败，请稍后再试" };
  }
});

module.exports = router;
