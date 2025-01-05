const Router = require("koa-router");
const db = require("@/db"); // 数据库模块
const router = new Router();

router.get("/course", async ctx => {
  try {
    // 获取查询参数
    const { page, pageSize, course_id, major_id, course_name } = ctx.query;

    // 设置分页默认值
    const currentPage = page ? parseInt(page) : 1;
    const size = pageSize ? parseInt(pageSize) : 10;
    const offset = (currentPage - 1) * size;

    // 构建查询条件
    let whereClauses = [];
    let queryParams = [];

    // 根据课程ID查询
    if (course_id) {
      whereClauses.push("course.id = ?");
      queryParams.push(course_id);
    }

    // 根据专业名称模糊查询
    if (major_id) {
      whereClauses.push("major.id LIKE ?");
      queryParams.push(`%${major_id}%`);
    }

    // 根据专业ID查询
    if (course_name) {
      whereClauses.push("course.major = ?");
      queryParams.push(course_name);
    }

    // 根据学期排序
    let orderBy = "ORDER BY course.semester ASC";

    // 如果有查询条件，拼接WHERE子句
    const whereSql = whereClauses.length > 0 ? "WHERE " + whereClauses.join(" AND ") : "";

    // 查询课程总数
    const totalQuery = `
      SELECT COUNT(*) AS total
      FROM course
      LEFT JOIN major ON course.major = major.id
      ${whereSql}
    `;
    const [totalResult] = await db.query(totalQuery, queryParams);
    const total = totalResult[0].total;

    // 查询课程列表
    const coursesQuery = `
      SELECT course.id, course.name,course.major, course.credit, course.total_score, course.semester, major.name AS major_name
      FROM course
      LEFT JOIN major ON course.major = major.id
      ${whereSql}
      ${orderBy}
      LIMIT ? OFFSET ?
    `;
    queryParams.push(size, offset);
    const [courses] = await db.query(coursesQuery, queryParams);

    // 返回结果
    ctx.body = {
      success: true,
      data: {
        list: courses,
        total,
        currentPage,
        pageSize: size,
        totalPages: Math.ceil(total / size),
      },
    };
  } catch (error) {
    console.error(error);
    ctx.body = { success: false, message: "查询课程失败，请稍后再试" };
  }
});

module.exports = router;
