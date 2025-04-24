let Router = require("koa-router");
let db = require("@/db"); // 数据库操作模块
let auth = require("@/modules/auth"); // 身份验证模块
let { id } = require("lodash-toolkit");
let router = new Router();

// 添加通知接口
router.post("/notice", auth(["a"]), async ctx => {
  try {
    // 获取请求体中的数据
    const { title, content, major_id, target, isTop } = ctx.request.body;

    // 校验请求参数
    if (!title || !content) {
      ctx.body = { success: false, message: "标题、内容和目标不能为空" };
      return;
    }

    // 校验目标类型
    const validTargets = ["student", "teacher", ""]; // 目标类型
    if (!validTargets.includes(target)) {
      ctx.body = { success: false, message: "无效的目标类型" };
      return;
    }

    // 获取当前时间作为通知创建时间

    // 插入通知数据到数据库
    const insertQuery = `INSERT INTO notice (id,title, content, target, isTop,major_id,create_time) 
                         VALUES (?, ?, ?, ?, ?, ?,NOW())`;
    const [insertRes] = await db.query(insertQuery, [
      id(),
      title,
      content,
      target,
      isTop ? 1 : 0,
      JSON.stringify(major_id),
    ]);

    const noticeId = insertRes.insertId;

    // 返回成功结果
    ctx.body = {
      success: true,
      message: "通知创建成功",
      data: { notice_id: noticeId, title, content, target, isTop, major_id },
    };
  } catch (error) {
    console.error("创建通知失败:", error);
    ctx.body = { success: false, message: "创建通知失败，请稍后再试" };
  }
});

module.exports = router;
