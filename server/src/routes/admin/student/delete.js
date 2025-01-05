const Router = require("koa-router");
const db = require("@/db"); // 假设你的数据库查询模块
const router = new Router();
const auth = require("@/modules/auth"); // 引入 auth 模块

router.delete("/student/:studentId", auth(["a"]), async ctx => {
  const studentId = ctx.params.studentId; // 获取请求中的学生ID

  try {
    // 开启事务
    await db.query("START TRANSACTION");

    // 删除成绩单中的成绩记录
    const deleteScoresQuery = `DELETE FROM score WHERE student_id = ?`;
    const [deleteScoresResult] = await db.query(deleteScoresQuery, [studentId]);

    // 删除学生记录
    const deleteStudentQuery = `DELETE FROM student WHERE id = ?`;
    const [deleteStudentResult] = await db.query(deleteStudentQuery, [studentId]);

    // 检查学生是否存在并被删除
    if (deleteStudentResult.affectedRows === 0) {
      // 如果没有删除任何记录，回滚事务并返回失败信息
      await db.query("ROLLBACK");
      ctx.body = { success: false, message: "未找到指定学生" };
      return;
    }

    // 提交事务
    await db.query("COMMIT");

    // 返回成功信息
    ctx.body = {
      success: true,
      message: "学生及相关成绩记录删除成功",
      data: { student_id: studentId },
    };
  } catch (error) {
    // 回滚事务
    await db.query("ROLLBACK");
    console.error(error);
    ctx.body = { success: false, message: "删除学生失败，请稍后再试" };
  }
});

module.exports = router;
