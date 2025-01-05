let Router = require("koa-router");
let db = require("@/db");
let auth = require("@/modules/auth");
let router = new Router();

router.get(["/college/:page", "/college"], auth(["a"]), async ctx => {
  try {
    // 获取分页参数
    const page = parseInt(ctx.params.page) || 1; // 默认第一页
    const pageSize = parseInt(ctx.query.pageSize) || 10; // 默认每页10条
    const keyword = ctx.query.keyword || ""; // 获取关键词参数

    // 计算分页偏移量
    const offset = (page - 1) * pageSize;

    // 构建查询条件
    let query = `
      SELECT
        c.id AS college_id,
        c.name AS college_name,
        COUNT(DISTINCT t.id) AS teacher_count,
        COUNT(DISTINCT m.id) AS major_count,
        SUM(IFNULL(s.student_count, 0)) AS student_count
      FROM college c
      LEFT JOIN major m ON m.college_id = c.id
      LEFT JOIN teacher t ON t.college_id = c.id
      LEFT JOIN (
        SELECT s.major_id, COUNT(s.id) AS student_count
        FROM student s
        GROUP BY s.major_id
      ) s ON s.major_id = m.id
    `;

    // 如果有 keyword，添加模糊查询条件
    if (keyword) {
      query += ` WHERE c.name LIKE ?`;
    }

    // 如果需要分页，添加 LIMIT 子句
    let params;
    if (ctx.params.page) {
      query += ` GROUP BY c.id LIMIT ?, ?`;
      params = keyword ? [`%${keyword}%`, offset, pageSize] : [offset, pageSize];
    } else {
      query += ` GROUP BY c.id`; // 不分页时不需要 LIMIT
      params = keyword ? [`%${keyword}%`] : [];
    }

    // 执行查询
    const [colleges] = await db.query(query, params);

    // 查询学院总数，用于分页（如果没有分页，仍然需要获取总数）
    let countQuery = `SELECT COUNT(*) AS total FROM college`;
    if (keyword) {
      countQuery += ` WHERE name LIKE ?`;
    }

    const countParams = keyword ? [`%${keyword}%`] : [];
    const [countRes] = await db.query(countQuery, countParams);
    const total = countRes[0]?.total || 0;

    // 返回分页数据或所有数据
    ctx.body = {
      success: true,
      data: {
        total,
        page: ctx.params.page || 1,
        pageSize,
        list: colleges,
      },
    };
  } catch (error) {
    console.error(error);
    ctx.body = { success: false, message: "查询失败，请稍后再试" };
  }
});

module.exports = router;
