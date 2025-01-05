const Router = require("koa-router");
const db = require("@/db"); // 数据库模块
const auth = require("@/modules/auth"); // 权限验证模块
const router = new Router();

router.delete("/major/:id", auth(["a"]), async ctx => {
  const { id } = ctx.params; // 获取路径参数，即专业ID

  try {
    // 1. 检查专业下是否有课程
    const courseQuery = `SELECT 1 FROM course WHERE major = ?`;
    const [courseRes] = await db.query(courseQuery, [id]);
    if (courseRes.length > 0) {
      ctx.body = { success: false, message: "该专业下有课程，无法删除" };
      return;
    }

    // 2. 检查专业下是否有学生
    const studentQuery = `SELECT 1 FROM student WHERE major_id = ?`;
    const [studentRes] = await db.query(studentQuery, [id]);
    if (studentRes.length > 0) {
      ctx.body = { success: false, message: "该专业下有学生，无法删除" };
      return;
    }

    // 3. 检查专业下是否有教师授课
    const teacherCourseQuery = `SELECT 1 FROM teacher_course WHERE course_id IN (SELECT id FROM course WHERE major = ?)`;
    const [teacherCourseRes] = await db.query(teacherCourseQuery, [id]);
    if (teacherCourseRes.length > 0) {
      ctx.body = { success: false, message: "该专业下有教师授课，无法删除" };
      return;
    }

    // 4. 删除专业
    const deleteQuery = `DELETE FROM major WHERE id = ?`;
    const [deleteRes] = await db.query(deleteQuery, [id]);

    // 判断是否删除成功
    if (deleteRes.affectedRows > 0) {
      ctx.body = { success: true, message: "专业删除成功" };
    } else {
      ctx.body = { success: false, message: "专业删除失败，可能该专业不存在" };
    }
  } catch (error) {
    console.error(error);
    ctx.body = { success: false, message: "删除专业失败，请稍后再试" };
  }
});

module.exports = router;
