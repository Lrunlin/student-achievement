let Router = require("koa-router");
let db = require("@/db");
let auth = require("@/modules/auth");
let router = new Router();

router.put("/major/:id", auth(["a"]), async ctx => {
  try {
    // 获取请求参数
    const majorId = parseInt(ctx.params.id); // 专业ID
    const { majorName, collegeId } = ctx.request.body; // 新专业名称、新学院ID

    // 校验请求参数
    if (!majorName || !collegeId || isNaN(majorId)) {
      ctx.body = { success: false, message: "参数无效，请提供专业名称、学院ID。" };
      return;
    }

    // 查询要修改的专业是否存在
    const checkMajorQuery = "SELECT * FROM major WHERE id = ?";
    const [existingMajor] = await db.query(checkMajorQuery, [majorId]);
    if (existingMajor.length === 0) {
      ctx.body = { success: false, message: "该专业不存在。" };
      return;
    }

    // 校验同一学院和下是否已有相同名称的专业
    const checkDuplicateQuery = `
      SELECT 1 FROM major 
      WHERE college_id = ? AND name = ? ;
    `;
    const [duplicateMajor] = await db.query(checkDuplicateQuery, [collegeId, majorName]);

    if (duplicateMajor.length > 0) {
      ctx.body = { success: false, message: "该学院下已有相同名称的专业" };
      return;
    }
    console.log(majorName, collegeId, majorId);

    // 更新专业信息
    const updateQuery = `
      UPDATE major
      SET name = ?, college_id = ?
      WHERE id = ?;
    `;
    const [result] = await db.query(updateQuery, [majorName, collegeId, majorId]);

    // 检查更新结果
    if (result.affectedRows === 0) {
      ctx.body = { success: false, message: "更新失败，请稍后再试。" };
      return;
    }

    // 返回成功响应
    ctx.body = { success: true, message: "专业信息更新成功。" };
  } catch (error) {
    console.error(error);
    ctx.body = { success: false, message: "系统错误，请稍后再试。" };
  }
});

module.exports = router;
