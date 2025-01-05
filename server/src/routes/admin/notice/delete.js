let Router = require("koa-router");
let db = require("@/db");
let auth = require("@/modules/auth");
let router = new Router();

// 删除通知接口
router.delete("/notice/:id", auth(["a"]), async ctx => {
  try {
    const noticeId = ctx.params.id; // 获取通知ID

    // 1. 校验通知是否存在
    const checkNoticeQuery = `SELECT * FROM notice WHERE id = ?`;
    const [noticeRes] = await db.query(checkNoticeQuery, [noticeId]);

    if (noticeRes.length === 0) {
      ctx.body = { success: false, message: "通知不存在" };
      return;
    }

    // 2. 删除与该通知相关的历史记录
    const deleteHistoryQuery = `DELETE FROM notice_history WHERE notice_id = ?`;
    await db.query(deleteHistoryQuery, [noticeId]);

    // 3. 删除通知
    const deleteNoticeQuery = `DELETE FROM notice WHERE id = ?`;
    await db.query(deleteNoticeQuery, [noticeId]);

    // 返回成功消息
    ctx.body = {
      success: true,
      message: "通知删除成功",
    };
  } catch (error) {
    console.error("删除通知失败:", error);
    ctx.body = { success: false, message: "删除通知失败，请稍后再试" };
  }
});

module.exports = router;
