let Router = require("koa-router");
let db = require("@/db");
let auth = require("@/modules/auth");
let router = new Router();
let { id } = require("lodash-toolkit");

// 标记通知为已读接口
router.post("/notice/read", auth(["s", "t"]), async ctx => {
  try {
    const userId = ctx.id; // 当前用户的ID
    const { notice_ids } = ctx.request.body; // 获取前端传递的 notice_id 数组

    // 参数校验：确保 notice_ids 是一个数组并且不能为空
    if (!Array.isArray(notice_ids) || notice_ids.length === 0) {
      ctx.body = {
        success: false,
        message: "请传递有效的通知 ID 数组。",
      };
      return;
    }

    // 验证每个 notice_id 是否存在并有效
    const validNoticeIdsQuery = `SELECT id FROM notice WHERE id IN (?)`;
    const [validNotices] = await db.query(validNoticeIdsQuery, [notice_ids]);

    if (validNotices.length !== notice_ids.length) {
      ctx.body = {
        success: false,
        message: "部分通知 ID 无效或不存在。",
      };
      return;
    }

    // 插入通知历史记录
    const insertHistoryQuery = `
      INSERT INTO notice_history (id,user_id, notice_id) 
      VALUES (?,?, ?)
    `;

    const insertPromises = notice_ids.map(noticeId => {
      return db.query(insertHistoryQuery, [id(), userId, noticeId]);
    });

    // 等待所有插入完成
    await Promise.all(insertPromises);

    // 返回成功响应
    ctx.body = {
      success: true,
      message: "通知已成功标记为已读。",
    };
  } catch (error) {
    console.error("标记通知为已读失败:", error);
    ctx.body = {
      success: false,
      message: "标记通知为已读失败，请稍后再试。",
    };
  }
});

module.exports = router;
