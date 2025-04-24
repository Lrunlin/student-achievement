let Router = require("koa-router");
let db = require("@/db");
let auth = require("@/modules/auth");
let { id } = require("lodash-toolkit");
let router = new Router();

// 创建课程接口
router.post("/course", auth(["a"]), async ctx => {
  try {
    // 获取请求体中的数据
    const { name, credit, total_score, major_id, semester } = ctx.request.body;

    // 校验请求参数
    if (!name || !credit || !total_score || !major_id || !semester) {
      ctx.body = { success: false, message: "课程名称、学分、总分、专业ID和学期不能为空" };
      return;
    }

    // 校验专业是否存在
    const majorQuery = `SELECT 1 FROM major WHERE id = ?`;
    const [majorRes] = await db.query(majorQuery, [major_id]);
    if (majorRes.length === 0) {
      ctx.body = { success: false, message: "指定的专业不存在" };
      return;
    }

    // 插入新的课程记录
    const courseId = id(); // 生成新的课程ID
    const insertCourseQuery = `INSERT INTO course (id, name, credit, total_score, major, semester) VALUES (?, ?, ?, ?, ?, ?)`;
    const [insertRes] = await db.query(insertCourseQuery, [
      courseId,
      name,
      credit,
      total_score,
      major_id,
      semester,
    ]);

    // 返回成功结果
    ctx.body = {
      success: true,
      message: "课程创建成功",
      data: { course_id: insertRes.insertId, name, credit, total_score, major_id, semester },
    };
  } catch (error) {
    console.error(error);
    ctx.body = { success: false, message: "创建课程失败，请稍后再试" };
  }
});

module.exports = router;
