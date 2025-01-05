const Router = require("koa-router");
const db = require("@/db"); // 数据库模块
const auth = require("@/modules/auth"); // 权限验证模块
const router = new Router();

router.delete("/college/:id", auth(["a"]), async ctx => {
  const { id } = ctx.params; // 获取路径参数，即学院ID

  try {
    // 1. 检查学院下是否有专业
    const majorQuery = `SELECT 1 FROM major WHERE college_id = ?`;
    const [majorRes] = await db.query(majorQuery, [id]);
    if (majorRes.length > 0) {
      ctx.body = { success: false, message: "该学院下有专业，无法删除" };
      return;
    }

    // 2. 检查学院下是否有教师
    const teacherQuery = `SELECT 1 FROM teacher WHERE college_id = ?`;
    const [teacherRes] = await db.query(teacherQuery, [id]);
    if (teacherRes.length > 0) {
      ctx.body = { success: false, message: "该学院下有教师，无法删除" };
      return;
    }

    // 3. 检查学院下是否有学生
    const studentQuery = `SELECT 1 FROM student WHERE major_id IN (SELECT id FROM major WHERE college_id = ?)`;
    const [studentRes] = await db.query(studentQuery, [id]);
    if (studentRes.length > 0) {
      ctx.body = { success: false, message: "该学院下有学生，无法删除" };
      return;
    }

    // 4. 删除学院
    const deleteQuery = `DELETE FROM college WHERE id = ?`;
    const [deleteRes] = await db.query(deleteQuery, [id]);

    // 判断是否删除成功
    if (deleteRes.affectedRows > 0) {
      ctx.body = { success: true, message: "学院删除成功" };
    } else {
      ctx.body = { success: false, message: "学院删除失败，可能该学院不存在" };
    }
  } catch (error) {
    console.error(error);
    ctx.body = { success: false, message: "删除学院失败，请稍后再试" };
  }
});

module.exports = router;
