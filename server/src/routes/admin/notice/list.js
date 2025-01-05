let Router = require("koa-router");
let db = require("@/db");
let auth = require("@/modules/auth");
let router = new Router();

// 查询通知接口（带分页，按 isTop 排序）
router.get("/notice", auth(["a", "s", "t"]), async ctx => {
  try {
    const userId = ctx.id; // 当前用户的ID
    const userType = ctx.auth; // 当前用户的角色类型（admin, student, teacher）

    // 获取分页参数，默认第一页每页10条
    const page = parseInt(ctx.query.page) || 1;
    const limit = parseInt(ctx.query.limit) || 10;

    // 计算 OFFSET
    const offset = (page - 1) * limit;

    // 基本查询条件
    let whereConditions = [];
    let queryParams = [];

    // 管理员权限：根据时间查询通知
    if (userType === "admin") {
      // 管理员直接按时间查询（可以根据实际需求来扩展时间参数，当前没有携带查询参数）
      whereConditions.push("1 = 1"); // 永远成立的条件，查询所有通知
    }

    // 学生和教师权限：根据目标类型、专业ID、通知历史来查询通知
    if (userType === "student" || userType === "teacher") {
      // 根据target筛选通知
      whereConditions.push("(target IN ('', ?) OR target = '')");
      queryParams.push(userType); // 只会返回自己相关的通知

      // 如果是学生：根据专业 ID 查询通知
      if (userType === "student") {
        // 获取学生的专业 ID
        const studentQuery = `SELECT major_id FROM student WHERE id = ?`;
        const [studentRes] = await db.query(studentQuery, [userId]);
        if (studentRes.length > 0) {
          const studentMajorId = studentRes[0].major_id;
          whereConditions.push("JSON_CONTAINS(major_id, ?) OR JSON_LENGTH(major_id) = 0");
          queryParams.push(`[${studentMajorId}]`);
        }
      }
    }

    // 根据查询条件生成 SQL
    const whereClause = whereConditions.length > 0 ? "WHERE " + whereConditions.join(" AND ") : "";

    // 修改查询语句，按 isTop 排序，isTop 为 1 的通知排在前面
    const query = `
      SELECT * 
      FROM notice ${whereClause} 
      ORDER BY ${
        userType === "student" || userType === "teacher" ? "isTop DESC," : ""
      } create_time DESC 
      LIMIT ? OFFSET ?`;
    queryParams.push(limit, offset); // 添加分页参数：limit 和 offset

    const [notices] = await db.query(query, queryParams);

    // 如果是学生或教师，查询阅读历史并添加 isRead 字段
    if (userType === "student" || userType === "teacher") {
      const noticeIds = notices.map(notice => notice.id);

      if (noticeIds.length > 0) {
        // 查询用户的阅读历史
        const historyQuery = `
          SELECT notice_id 
          FROM notice_history 
          WHERE user_id = ? AND notice_id IN (?)`;
        const [historyRes] = await db.query(historyQuery, [userId, noticeIds]);

        // 将已阅读的通知标记为 isRead: true
        const readNoticeIds = historyRes.map(history => history.notice_id);
        notices.forEach(notice => {
          notice.isRead = readNoticeIds.includes(notice.id);
        });
      } else {
        // 如果没有通知，默认未读
        notices.forEach(notice => {
          notice.isRead = false; // 默认未读
        });
      }
    }

    // 获取总记录数，用于分页信息
    const countQuery = `SELECT COUNT(*) AS total FROM notice ${whereClause}`;
    const [countRes] = await db.query(countQuery, queryParams);
    const totalRecords = countRes[0].total;

    // 返回查询结果
    ctx.body = {
      success: true,
      data: notices,
      pagination: {
        total: totalRecords,
        page: page,
        limit: limit,
        totalPages: Math.ceil(totalRecords / limit), // 计算总页数
      },
    };
  } catch (error) {
    console.error("查询通知失败:", error);
    ctx.body = { success: false, message: "查询通知失败，请稍后再试" };
  }
});

module.exports = router;
