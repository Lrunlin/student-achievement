let Router = require("koa-router");
let db = require("@/db");
let auth = require("@/modules/auth");
let { id } = require("node-server-dev");
let router = new Router();

router.post("/college", auth(["a"]), async ctx => {
  const { name } = ctx.request.body;

  // 检查学院名称是否为空
  if (!name) {
    ctx.body = { success: false, message: "学院名称不能为空" };
    return;
  }

  try {
    // 检查是否已有同名学院
    const [existingCollege] = await db.query(`SELECT * FROM college WHERE name = ?`, [name]);

    if (existingCollege.length > 0) {
      // 如果已存在，返回错误信息
      ctx.body = { success: false, message: "学院名称已存在" };
      return;
    }

    // 插入新的学院数据
    const result = await db.query(
      `INSERT INTO college (id,name, create_time) VALUES (?,?, ?)`,
      [id(), name, new Date()] // 使用当前时间作为默认创建时间
    );

    // 返回创建成功的结果
    ctx.body = {
      success: true,
      message: "学院创建成功",
      data: {
        id: result.insertId,
        name,
      },
    };
  } catch (error) {
    ctx.body = { success: false, message: "创建学院失败，请稍后再试" };
  }
});

module.exports = router;
