const Router = require("koa-router");
const db = require("@/db");
const auth = require("@/modules/auth");
const router = new Router();

// 修改当前学期接口
router.put("/semester", auth(["a"]), async ctx => {
  try {
    const { semester } = ctx.request.body; // 从请求体中获取新的学期值

    // 验证新的学期值是否为空
    if (!semester) {
      ctx.body = { success: false, message: "学期值不能为空" };
      return;
    }

    // 查询 option 表中是否存在 key = 'semester' 的记录
    const query = "SELECT * FROM options WHERE `key` = 'semester'";
    const [rows] = await db.query(query);

    if (rows.length > 0) {
      // 如果存在，更新该记录的 value 字段
      const updateQuery = "UPDATE options SET value = ? WHERE `key` = 'semester'";
      await db.query(updateQuery, [semester]);

      ctx.body = { success: true, message: "学期更新成功" };
    } else {
      // 如果不存在，返回错误信息
      ctx.body = { success: false, message: "没有找到学期设置" };
    }
  } catch (error) {
    console.error("修改学期失败:", error);
    ctx.body = { success: false, message: "修改学期失败，请稍后再试" };
  }
});

module.exports = router;
