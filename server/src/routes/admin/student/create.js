const Router = require("koa-router");
const db = require("@/db"); // 假设你的数据库查询模块
const router = new Router();
const auth = require("@/modules/auth"); // 引入 auth 模块
let { id } = require("node-server-dev");

router.post("/student", auth(["a"]), async ctx => {
  const { name, age, sex, major_id, class_id } = ctx.request.body;

  // 校验参数
  if (!name || !age || !sex || !major_id || !class_id) {
    ctx.body = { success: false, message: "参数缺失" };
    return;
  }

  try {
    // 查询专业是否存在
    const majorQuery = `SELECT * FROM major WHERE id = ?`;
    const [major] = await db.query(majorQuery, [major_id]);

    if (!major || major.length === 0) {
      ctx.body = { success: false, message: "指定的专业不存在" };
      return;
    }

    // 查询班级是否存在
    const classQuery = `SELECT * FROM class_list WHERE id = ?`;
    const [classInfo] = await db.query(classQuery, [class_id]);

    if (!classInfo || classInfo.length === 0) {
      ctx.body = { success: false, message: "指定的班级不存在" };
      return;
    }

    // 生成学生ID
    const studentId = id(); // 生成学生ID

    // 插入学生信息
    const studentInsertQuery = `
      INSERT INTO student (id, name, age, sex, major_id, class_id,password, create_time) 
      VALUES (?, ?, ?, ?, ?, ?,?, NOW())
    `;
    await db.query(studentInsertQuery, [studentId, name, age, sex, major_id, class_id,studentId]);

    // 返回成功信息
    ctx.body = {
      success: true,
      message: "学生添加成功",
      data: { student_id: studentId },
    };
  } catch (error) {
    console.error(error);
    ctx.body = { success: false, message: "添加学生失败，请稍后再试" };
  }
});

module.exports = router;
