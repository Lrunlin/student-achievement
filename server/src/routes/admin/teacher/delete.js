const Router = require("koa-router");
const db = require("@/db"); // 假设你的数据库查询模块
const router = new Router();
const auth = require("@/modules/auth"); // 引入 auth 模块

router.delete("/teacher/:teacherId", auth(["a"]), async ctx => {
  const teacherId = ctx.params.teacherId; // 获取请求中的教师ID

  if (!teacherId) {
    ctx.body = { success: false, message: "教师ID不能为空" };
    return;
  }

  try {
    // 1. 删除教师与课程之间的关联
    const deleteTeacherCourseQuery = `
      DELETE FROM teacher_course 
      WHERE teacher_id = ?`;
    await db.query(deleteTeacherCourseQuery, [teacherId]);

    // 2. 删除教师记录
    const deleteTeacherQuery = `
      DELETE FROM teacher 
      WHERE id = ?`;
    const [teacherDeleteResult] = await db.query(deleteTeacherQuery, [teacherId]);

    if (teacherDeleteResult.affectedRows === 0) {
      ctx.body = { success: false, message: "未找到指定教师" };
      return;
    }

    // 返回成功信息
    ctx.body = {
      success: true,
      message: "教师删除成功",
    };
  } catch (error) {
    console.error(error);
    ctx.body = { success: false, message: "删除教师失败，请稍后再试" };
  }
});

module.exports = router;
