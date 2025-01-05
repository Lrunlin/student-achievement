let Router = require("koa-router");
let db = require("@/db");
let auth = require("@/modules/auth");
let router = new Router();

router.get(["/major/:page", "/major"], auth(["a"]), async ctx => {
  try {
    // 获取分页参数
    const page = parseInt(ctx.params.page); // 获取页码，若不存在则为 NaN
    const pageSize = parseInt(ctx.query.pageSize) || 10; // 默认每页10条
    const keyword = ctx.query.keyword || ""; // 获取关键字参数
    const collegeName = ctx.query.collegeName || ""; // 获取学院名称参数

    // 计算分页偏移量
    const offset = (page - 1) * pageSize;

    // 构建查询条件
    let query = `
      SELECT
        m.id AS major_id,
        m.name AS major_name,
        c.name AS college_name,
        c.id AS college_id,
        COUNT(cl.id) AS class_count
      FROM major m
      LEFT JOIN college c ON c.id = m.college_id
      LEFT JOIN class_list cl ON cl.major_id = m.id
    `;

    // 如果有 collegeName，添加过滤条件
    let conditions = [];
    if (collegeName) {
      conditions.push(`c.name LIKE ?`);
    }
    if (keyword) {
      conditions.push(`m.name LIKE ?`);
    }

    // 构建 WHERE 子句
    if (conditions.length > 0) {
      query += ` WHERE ` + conditions.join(" AND ");
    }

    // 根据是否需要分页来添加 LIMIT 子句
    if (page) {
      query += ` GROUP BY m.id, c.id ORDER BY c.name LIMIT ?, ?`;
    } else {
      query += ` GROUP BY m.id, c.id ORDER BY c.name`; // 不分页时不需要 LIMIT
    }

    // 设置查询参数
    const params = [
      ...(collegeName ? [`%${collegeName}%`] : []),
      ...(keyword ? [`%${keyword}%`] : []),
      ...(page ? [offset, pageSize] : []), // 如果需要分页，添加分页参数
    ];

    // 执行查询
    const [majors] = await db.query(query, params);

    // 查询专业总数，用于分页
    let countQuery = `SELECT COUNT(*) AS total FROM major m LEFT JOIN college c ON c.id = m.college_id`;
    if (conditions.length > 0) {
      countQuery += ` WHERE ` + conditions.join(" AND ");
    }

    // 执行总数查询
    const [countRes] = await db.query(countQuery, [
      ...(collegeName ? [`%${collegeName}%`] : []),
      ...(keyword ? [`%${keyword}%`] : []),
    ]);
    const total = countRes[0]?.total || 0;

    // 返回分页数据或所有数据
    ctx.body = {
      success: true,
      data: {
        total,
        page: page || 1, // 如果没有 page 参数，则默认为 1
        pageSize,
        list: majors,
      },
    };
  } catch (error) {
    console.log(error);
    ctx.body = { success: false, message: "查询失败，请稍后再试" };
  }
});

module.exports = router;
