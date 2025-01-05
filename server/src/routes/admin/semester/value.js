const Router = require("koa-router");
const db = require("@/db");
const router = new Router();

// 查询当前学期接口
router.get("/semester", async ctx => {
  try {
    // 查询 option 表中 key = 'semester' 的记录
    const query = "SELECT * FROM options WHERE `key` = 'semester'";
    const [rows] = await db.query(query);

    if (rows.length > 0) {
      // 如果找到记录，返回当前学期
      const currentSemester = rows[0].value;
      ctx.body = { success: true, currentSemester };
    } else {
      // 如果没有找到学期设置，返回错误信息
      ctx.body = { success: false, message: "没有找到当前学期" };
    }
  } catch (error) {
    console.error("查询当前学期失败:", error);
    ctx.body = { success: false, message: "查询当前学期失败，请稍后再试" };
  }
});

module.exports = router;
