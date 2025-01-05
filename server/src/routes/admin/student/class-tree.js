const Router = require("koa-router");
const db = require("@/db"); // 假设你的数据库查询模块
const router = new Router();
const auth = require("@/modules/auth"); // 引入 auth 模块

// 查询整个树状 学院 专业 班级
router.get("/tree/college-major-class", auth(["a"]), async ctx => {
  try {
    // 查询所有学院
    const collegeQuery = `
      SELECT id, name FROM college
    `;
    const [colleges] = await db.query(collegeQuery);

    if (colleges.length === 0) {
      ctx.body = { success: false, message: "没有找到学院数据" };
      return;
    }

    // 查询所有专业
    const majorQuery = `
      SELECT id, name, college_id FROM major
    `;
    const [majors] = await db.query(majorQuery);

    if (majors.length === 0) {
      ctx.body = { success: false, message: "没有找到专业数据" };
      return;
    }

    // 查询所有班级
    const classQuery = `
      SELECT * FROM class_list
    `;
    const [classes] = await db.query(classQuery);

    if (classes.length === 0) {
      ctx.body = { success: false, message: "没有找到班级数据" };
      return;
    }

    // 构建树形结构
    const result = colleges.map(college => {
      // 找到该学院下的所有专业
      const collegeMajors = majors.filter(major => major.college_id === college.id);

      const majorData = collegeMajors.map(major => {
        // 找到该专业下的所有班级
        const majorClasses = classes.filter(cls => cls.major_id === major.id);

        return {
          id: major.id,
          name: major.name,
          class_data: majorClasses.map(cls => ({
            class_id: cls.id,
            class_index: cls.index,
          })),
        };
      });

      return {
        college_id: college.id,
        college_name: college.name,
        major_data: majorData,
      };
    });

    // 返回树形结构
    ctx.body = {
      success: true,
      message: "查询成功",
      data: result,
    };
  } catch (error) {
    console.error(error);
    ctx.body = { success: false, message: "查询失败，请稍后再试" };
  }
});

module.exports = router;
