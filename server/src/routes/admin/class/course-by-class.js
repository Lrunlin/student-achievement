const Router = require("koa-router");
const db = require("@/db"); // 假设你的数据库查询模块
const router = new Router();

// 根据课程ID查询该课程所属专业下的班级及专业名称
router.get("/course-by-class/:courseId", async ctx => {
  const courseId = ctx.params.courseId;

  try {
    // 查询课程对应的专业ID
    const courseQuery = `SELECT major FROM course WHERE id = ?`;
    const [courseResult] = await db.query(courseQuery, [courseId]);

    if (courseResult.length === 0) {
      ctx.body = { success: false, message: "课程不存在" };
      return;
    }

    const majorId = courseResult[0].major;

    // 查询该专业的名称
    const majorQuery = `SELECT name FROM major WHERE id = ?`;
    const [majorResult] = await db.query(majorQuery, [majorId]);

    if (majorResult.length === 0) {
      ctx.body = { success: false, message: "该专业不存在" };
      return;
    }

    const majorName = majorResult[0].name;

    // 查询该专业下的所有班级，并将专业名称添加到班级信息中
    const classQuery = `SELECT id, \`index\` AS class_index FROM class_list WHERE major_id = ?`;
    const [classResult] = await db.query(classQuery, [majorId]);

    // 将专业名称添加到每个班级信息中
    const classWithMajorName = classResult.map(classItem => ({
      ...classItem,
      major_name: majorName,
    }));

    // 返回班级数据，并附带专业名称
    ctx.body = {
      success: true,
      message: "查询成功",
      data: classWithMajorName,
    };
  } catch (error) {
    console.error(error);
    ctx.body = { success: false, message: "查询失败，请稍后再试" };
  }
});

module.exports = router;
