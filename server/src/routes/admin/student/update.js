const Router = require("koa-router");
const db = require("@/db"); // 假设你的数据库查询模块
const router = new Router();
const auth = require("@/modules/auth"); // 引入 auth 模块

router.put("/student/:studentId", auth(["a"]), async ctx => {
  const studentId = ctx.params.studentId; // 获取请求中的学生ID
  const { name, age, sex, major_id, class_id } = ctx.request.body; // 获取需要更新的数据

  // 检查参数是否齐全
  if (!name || !age || !sex || !major_id || !class_id) {
    ctx.body = { success: false, message: "参数缺失" };
    return;
  }

  try {
    // 更新学生信息
    const updateStudentQuery = `
      UPDATE student 
      SET name = ?, age = ?, sex = ?, major_id = ?, class_id = ? 
      WHERE id = ?`;
    const [updateResult] = await db.query(updateStudentQuery, [
      name,
      age,
      sex,
      major_id,
      class_id,
      studentId,
    ]);

    // 检查是否成功更新
    if (updateResult.affectedRows === 0) {
      ctx.body = { success: false, message: "未找到指定学生或更新失败" };
      return;
    }

    // 返回成功信息
    ctx.body = {
      success: true,
      message: "学生信息更新成功",
      data: { student_id: studentId },
    };
  } catch (error) {
    console.error(error);
    ctx.body = { success: false, message: "更新学生信息失败，请稍后再试" };
  }
});

module.exports = router;
