const Router = require("koa-router");
const db = require("@/db"); // 假设你的数据库查询模块
const router = new Router();
const auth = require("@/modules/auth"); // 引入 auth 模块

router.delete("/course/:courseId", auth(["a"]), async ctx => {
  const courseId = ctx.params.courseId; // 获取请求中的课程ID

  if (!courseId) {
    ctx.body = { success: false, message: "课程ID不能为空" };
    return;
  }

  try {
    // 1. 删除教师与课程之间的关联
    const deleteTeacherCourseQuery = `
      DELETE FROM teacher_course 
      WHERE course_id = ?`;
    await db.query(deleteTeacherCourseQuery, [courseId]);

    // 2. 删除成绩与课程之间的关联
    const deleteScoreCourseQuery = `
      DELETE FROM score 
      WHERE course_id = ?`;
    await db.query(deleteScoreCourseQuery, [courseId]);

    // 3. 删除课程记录
    const deleteCourseQuery = `
      DELETE FROM course 
      WHERE id = ?`;
    const [courseDeleteResult] = await db.query(deleteCourseQuery, [courseId]);

    if (courseDeleteResult.affectedRows === 0) {
      ctx.body = { success: false, message: "未找到指定课程" };
      return;
    }

    // 返回成功信息
    ctx.body = {
      success: true,
      message: "课程删除成功",
    };
  } catch (error) {
    console.error(error);
    ctx.body = { success: false, message: "删除课程失败，请稍后再试" };
  }
});

module.exports = router;
