const Router = require("koa-router");
const db = require("@/db"); // 假设你的数据库查询模块
const router = new Router();

// 根据学院ID查询该学院下的课程列表及所属专业
router.get("/course-by-college/:collegeId", async ctx => {
  const collegeId = ctx.params.collegeId;

  try {
    // 查询该学院下的所有专业
    const majorQuery = `SELECT id FROM major WHERE college_id = ?`;
    const [majorResult] = await db.query(majorQuery, [collegeId]);

    if (majorResult.length === 0) {
      ctx.body = { success: false, message: "该学院没有专业" };
      return;
    }

    // 获取所有专业的ID
    const majorIds = majorResult.map(major => major.id);

    // 查询这些专业下的所有课程，并同时查询所属的专业名称
    const courseQuery = `
      SELECT c.id AS course_id, c.name AS course_name, c.major AS major_id, m.name AS major_name
      FROM course c
      LEFT JOIN major m ON c.major = m.id
      WHERE c.major IN (?)
    `;
    const [courseResult] = await db.query(courseQuery, [majorIds]);

    // 返回课程数据，包含课程信息和所属专业名称
    ctx.body = {
      success: true,
      message: "查询成功",
      data: courseResult,
    };
  } catch (error) {
    console.error(error);
    ctx.body = { success: false, message: "查询失败，请稍后再试" };
  }
});

module.exports = router;
