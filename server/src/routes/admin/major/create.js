let Router = require("koa-router");
let db = require("@/db");
let auth = require("@/modules/auth");
let { id } = require("node-server-dev");
let router = new Router();

router.post("/major", auth(["a"]), async ctx => {
  try {
    // 获取请求体中的数据
    const { college_id, name } = ctx.request.body;

    // 校验请求参数
    if (!college_id || !name) {
      ctx.body = { success: false, message: "学院ID、专业名称不能为空" };
      return;
    }

    // 校验学院是否存在
    const collegeQuery = `SELECT 1 FROM college WHERE id = ?`;
    const [collegeRes] = await db.query(collegeQuery, [college_id]);
    if (collegeRes.length === 0) {
      ctx.body = { success: false, message: "指定的学院不存在" };
      return;
    }

    // 校验同一学院下是否已经有相同名称的专业
    const checkMajorQuery = `SELECT 1 FROM major WHERE college_id = ? AND name = ?;`;
    const [majorRes] = await db.query(checkMajorQuery, [college_id, name]);
    if (majorRes.length > 0) {
      ctx.body = { success: false, message: "该学院下已有相同名称的专业" };
      return;
    }

    // 插入新的专业记录
    const insertQuery = `INSERT INTO major (id, college_id, name) VALUES (?, ?, ?)`;
    const [insertRes] = await db.query(insertQuery, [id(), college_id, name]);

    // 返回成功结果
    ctx.body = {
      success: true,
      message: "专业创建成功",
      data: { major_id: insertRes.insertId, college_id, name },
    };
  } catch (error) {
    console.error(error);
    ctx.body = { success: false, message: "创建专业失败，请稍后再试" };
  }
});

module.exports = router;
