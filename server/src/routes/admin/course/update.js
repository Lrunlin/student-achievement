const Router = require("koa-router");
const db = require("@/db"); // 数据库模块
const auth = require("@/modules/auth"); // 引入 auth 模块
const router = new Router();

router.put("/course/:id", auth(["a"]), async ctx => {
  const { id } = ctx.params; // 获取路径参数，即课程ID
  const { name, credit, total_score, semester, major_id } = ctx.request.body; // 获取请求体中的课程信息

  try {
    // 校验必填参数
    if (!name || !credit || !total_score || !semester || !major_id) {
      ctx.body = { success: false, message: "课程名称、学分、总分、学期、专业ID不能为空" };
      return;
    }

    // 校验课程是否存在
    const courseQuery = `SELECT 1 FROM course WHERE id = ?`;
    const [courseRes] = await db.query(courseQuery, [id]);
    if (courseRes.length === 0) {
      ctx.body = { success: false, message: "课程不存在" };
      return;
    }

    // 更新课程信息
    const updateQuery = `
      UPDATE course 
      SET name = ?, credit = ?, total_score = ?, semester = ?, major = ?
      WHERE id = ?
    `;
    const [updateRes] = await db.query(updateQuery, [
      name,
      credit,
      total_score,
      semester,
      major_id,
      id,
    ]);

    // 判断是否更新成功
    if (updateRes.affectedRows > 0) {
      ctx.body = { success: true, message: "课程信息更新成功" };
    } else {
      ctx.body = { success: false, message: "课程信息未更新" };
    }
  } catch (error) {
    console.error(error);
    ctx.body = { success: false, message: "更新课程失败，请稍后再试" };
  }
});

module.exports = router;
