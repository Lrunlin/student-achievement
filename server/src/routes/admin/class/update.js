let Router = require("koa-router");
let db = require("@/db");
let auth = require("@/modules/auth");
let router = new Router();

router.put("/class/:class_id", auth(["a"]), async ctx => {
  const classId = ctx.params.class_id; // 获取班级ID
  const { index } = ctx.request.body; // 获取请求体中的班级index

  // 校验请求参数
  if (!index || isNaN(classId)) {
    ctx.body = { success: false, message: "参数无效，请提供班级ID和index。" };
    return;
  }

  try {
    // 1. 根据班级ID查询专业ID
    const getMajorIdQuery = `
      SELECT major_id 
      FROM class_list 
      WHERE id = ?
    `;
    const [majorResult] = await db.query(getMajorIdQuery, [classId]);

    if (majorResult.length === 0) {
      ctx.body = { success: false, message: "未找到该班级。" };
      return;
    }

    const majorId = majorResult[0].major_id;

    // 2. 检查该专业下是否已存在相同的index
    const checkDuplicateQuery = `
      SELECT 1 
      FROM class_list 
      WHERE major_id = ? AND \`index\` = ? AND id != ?
    `;
    const [duplicateResult] = await db.query(checkDuplicateQuery, [majorId, index, classId]);

    if (duplicateResult.length > 0) {
      ctx.body = { success: false, message: "该专业下已存在相同编号的班级。" };
      return;
    }

    // 3. 执行更新操作
    const updateQuery = `
      UPDATE class_list
      SET \`index\` = ?
      WHERE id = ?
    `;
    const [updateResult] = await db.query(updateQuery, [index, classId]);

    // 4. 检查更新结果
    if (updateResult.affectedRows === 0) {
      ctx.body = { success: false, message: "更新失败，未找到该班级。" };
      return;
    }

    // 5. 返回成功响应
    ctx.body = { success: true, message: "班级信息更新成功。" };
  } catch (error) {
    console.error(error);
    ctx.body = { success: false, message: "系统错误，请稍后再试。" };
  }
});

module.exports = router;
