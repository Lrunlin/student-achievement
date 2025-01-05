let Router = require("koa-router");
let db = require("@/db");
let auth = require("@/modules/auth");
let id = require("@/utils/id"); // 引入id函数
let router = new Router();

router.post("/class", auth(["a"]), async ctx => {
  try {
    // 获取请求参数
    const { major_id } = ctx.request.body;

    // 校验专业ID是否提供
    if (!major_id || isNaN(major_id)) {
      ctx.body = { success: false, message: "无效的专业ID" };
      return;
    }

    // 查询该专业下当前最大的班级编号 (index)
    const maxIndexQuery = `
      SELECT MAX(\`index\`) AS max_index
      FROM class_list
      WHERE major_id = ?
    `;
    const [maxIndexResult] = await db.query(maxIndexQuery, [major_id]);

    // 获取当前最大的班级编号 +1
    const nextIndex = maxIndexResult[0]?.max_index + 1 || 1; // 如果没有班级，则从1开始

    // 插入新的班级，使用id()生成唯一的id
    const insertClassQuery = `
      INSERT INTO class_list (id, major_id, \`index\`)
      VALUES (?, ?, ?)
    `;
    const [insertResult] = await db.query(insertClassQuery, [id(), major_id, nextIndex]);

    // 返回成功结果
    ctx.body = {
      success: true,
      message: `班级创建成功，班级编号为 ${nextIndex}`,
      data: {
        class_id: insertResult.insertId, // 返回新创建的班级ID
        major_id,
        index: nextIndex,
      },
    };
  } catch (error) {
    console.error(error);
    ctx.body = { success: false, message: "创建班级失败，请稍后再试" };
  }
});

module.exports = router;
