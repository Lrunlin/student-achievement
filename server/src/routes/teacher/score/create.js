const Router = require("koa-router");
const db = require("@/db"); // 数据库查询模块
const router = new Router();
const auth = require("@/modules/auth"); // 权限模块
let { id } = require("lodash-toolkit");

router.put("/score", auth(["a", "t"]), async ctx => {
  const { student_id, course_id, score } = ctx.request.body;

  // 校验请求参数
  if (!student_id || !course_id || score === undefined) {
    ctx.body = { success: false, message: "参数缺失" };
    return;
  }

  try {
    // 查询成绩表是否已经存在该学生和课程的成绩记录
    const checkQuery = `
      SELECT id 
      FROM score 
      WHERE student_id = ? AND course_id = ?;
    `;
    const [existingScore] = await db.query(checkQuery, [student_id, course_id]);

    if (existingScore.length > 0) {
      // 如果成绩记录已存在，执行更新
      const updateQuery = `
        UPDATE score 
        SET score = ?, create_time = NOW() 
        WHERE student_id = ? AND course_id = ?;
      `;
      await db.query(updateQuery, [score, student_id, course_id]);
      ctx.body = { success: true, message: "成绩更新成功" };
    } else {
      // 如果成绩记录不存在，执行插入
      const insertQuery = `
        INSERT INTO score (id,student_id, course_id, score, create_time) 
        VALUES (?,?, ?, ?, NOW());
      `;
      await db.query(insertQuery, [id(), student_id, course_id, score]);
      ctx.body = { success: true, message: "成绩添加成功" };
    }
  } catch (error) {
    console.error(error);
    ctx.body = { success: false, message: "操作失败，请稍后再试" };
  }
});

module.exports = router;
