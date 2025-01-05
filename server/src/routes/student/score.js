const Router = require("koa-router");
const db = require("@/db"); // 数据库查询模块
const router = new Router();
const auth = require("@/modules/auth"); // 权限模块

router.get("/student-score", auth(["a", "t", "s"]), async ctx => {
  try {
    const studentId = ctx.id; // 获取当前登录学生的ID

    if (!studentId) {
      ctx.body = { success: false, message: "学生ID无效" };
      return;
    }

    // 查询当前学期
    const semesterQuery = "SELECT value FROM options WHERE `key` = 'semester' LIMIT 1;";
    const [semesterResult] = await db.query(semesterQuery);

    if (semesterResult.length === 0) {
      ctx.body = { success: false, message: "无法获取当前学期" };
      return;
    }

    const currentSemester = semesterResult[0].value; // 获取当前学期

    // 查询当前学生本学期的课程及其成绩，并关联授课教师信息
    const query = `
      SELECT
        c.id AS course_id,
        c.name AS course_name,
        c.credit AS course_credit,
        c.total_score AS course_total_score,
        IFNULL(sc.score, NULL) AS student_score,  -- 如果没有成绩，返回null
        s.id AS student_id,
        s.name AS student_name,
        t.id AS teacher_id,
        t.name AS teacher_name
      FROM course c
      LEFT JOIN score sc ON sc.course_id = c.id AND sc.student_id = ?  -- 左连接score表，确保没有成绩时返回null
      LEFT JOIN student s ON s.id = ?  -- 确保返回学生信息
      LEFT JOIN teacher_course tc ON tc.course_id = c.id
      LEFT JOIN teacher t ON tc.teacher_id = t.id
      WHERE c.semester = ?  -- 过滤出本学期的课程
      ORDER BY c.id;
    `;

    const [result] = await db.query(query, [studentId, studentId, currentSemester]);

    // 返回数据
    ctx.body = {
      success: true,
      message: "查询成功",
      data: result,
    };
  } catch (error) {
    console.error(error);
    ctx.body = {
      success: false,
      message: "查询失败，请稍后再试",
    };
  }
});

module.exports = router;
