const Router = require("koa-router");
const db = require("@/db"); // 假设你的数据库查询模块
const router = new Router();
const auth = require("@/modules/auth"); // 引入 auth 模块

router.get("/student", auth(["a"]), async ctx => {
  const { student_id, class_id, page = 1, limit = 10 } = ctx.query; // 获取查询参数并设置默认分页参数

  // 如果没有传入学生ID或班级ID，则返回错误
  if (!student_id && !class_id) {
    ctx.body = { success: false, message: "缺少查询参数：学生ID或班级ID" };
    return;
  }

  try {
    let query = "";
    let countQuery = "";
    let params = [];
    const offset = (page - 1) * limit; // 计算偏移量

    if (student_id) {
      // 根据学生ID查询
      query = `SELECT * FROM student WHERE id = ? LIMIT ? OFFSET ?`;
      countQuery = `SELECT COUNT(*) as total FROM student WHERE id = ?`;
      params.push(student_id, parseInt(limit), offset);
    } else if (class_id) {
      // 根据班级ID查询
      query = `SELECT * FROM student WHERE class_id = ? LIMIT ? OFFSET ?`;
      countQuery = `SELECT COUNT(*) as total FROM student WHERE class_id = ?`;
      params.push(class_id, parseInt(limit), offset);
    }

    // 查询数据
    const [students] = await db.query(query, params);

    // 查询总数
    const [countResult] = await db.query(countQuery, [student_id || class_id]);
    const total = countResult[0].total;

    // 如果没有找到数据
    if (students.length === 0) {
      ctx.body = { success: false, message: "没有找到符合条件的学生" };
      return;
    }

    // 返回分页查询结果
    ctx.body = {
      success: true,
      message: "查询成功",
      data: {
        list: students,
        total,
        page: parseInt(page),
        limit: parseInt(limit),
      },
    };
  } catch (error) {
    console.error(error);
    ctx.body = { success: false, message: "查询失败，请稍后再试" };
  }
});

module.exports = router;
