let Router = require("koa-router");
let db = require("@/db");
let auth = require("@/modules/auth");
let router = new Router();

router.get("/class/:major_id", auth(["a"]), async ctx => {
  try {
    // 获取专业ID
    const majorId = parseInt(ctx.params.major_id);

    // 校验专业ID是否有效
    if (isNaN(majorId)) {
      ctx.body = { success: false, message: "无效的专业ID" };
      return;
    }

    // 查询该专业的所有班级及每个班级的学生数量
    const query = `
      SELECT 
        cl.id AS class_id,
        cl.index AS class_index,        -- 班级编号 (例如：第一班、第二班等)
        cl.major_id,
        COUNT(s.id) AS student_count    -- 学生数量
      FROM class_list cl
      LEFT JOIN student s ON s.class_id = cl.id
      WHERE cl.major_id = ?
      GROUP BY cl.id
      ORDER BY cl.index;
    `;

    const [classes] = await db.query(query, [majorId]);

    // 返回查询结果
    ctx.body = {
      success: true,
      data: {
        major_id: majorId,
        list: classes,
      },
    };
  } catch (error) {
    console.error(error);
    ctx.body = { success: false, message: "查询失败，请稍后再试" };
  }
});

module.exports = router;
