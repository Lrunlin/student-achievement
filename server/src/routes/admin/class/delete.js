let Router = require("koa-router");
let db = require("@/db");
let auth = require("@/modules/auth");
let router = new Router();

router.delete("/class/:class_id", auth(["a"]), async ctx => {
  const classId = ctx.params.class_id; // 获取班级ID

  // 校验班级ID参数
  if (isNaN(classId)) {
    ctx.body = { success: false, message: "无效的班级ID" };
    return;
  }

  try {
    // 1. 查询是否有学生关联到该班级
    const checkStudentsQuery = `
      SELECT COUNT(*) AS student_count
      FROM student
      WHERE class_id = ?
    `;
    const [studentResult] = await db.query(checkStudentsQuery, [classId]);

    // 如果有学生关联，返回错误提示
    if (studentResult[0].student_count > 0) {
      ctx.body = { success: false, message: "无法删除该班级，因为已有学生在该班级中。" };
      return;
    }

    // 2. 执行删除班级操作
    const deleteClassQuery = `
      DELETE FROM class_list
      WHERE id = ?
    `;
    const [deleteResult] = await db.query(deleteClassQuery, [classId]);

    // 3. 检查删除结果
    if (deleteResult.affectedRows === 0) {
      ctx.body = { success: false, message: "删除失败，未找到该班级。" };
      return;
    }

    // 4. 返回成功响应
    ctx.body = { success: true, message: "班级删除成功。" };
  } catch (error) {
    console.error(error);
    ctx.body = { success: false, message: "系统错误，请稍后再试。" };
  }
});

module.exports = router;
