const Router = require("koa-router");
const db = require("@/db"); // 假设你的数据库查询模块
const router = new Router();
const auth = require("@/modules/auth"); // 引入 auth 模块
let { id } = require("lodash-toolkit");

router.post("/teacher", auth(["a"]), async ctx => {
  const { name, age, sex, college_id, course_data } = ctx.request.body;

  if (!name || !age || !sex || !college_id || !course_data) {
    ctx.body = { success: false, message: "参数缺失" };
    return;
  }

  let teacherId = id();

  try {
    // 插入教师信息
    const teacherInsertQuery = `INSERT INTO teacher (id,name, age, sex, college_id, password, create_time) VALUES (?,?, ?, ?, ?, ?, NOW())`;
    const [teacherResult] = await db.query(teacherInsertQuery, [
      teacherId,
      name,
      age,
      sex,
      college_id,
      teacherId,
    ]);

    // 处理课程数据
    for (const course of course_data) {
      const { course_id, class_id } = course;

      // 检查该课程是否已经存在该教师的记录
      const courseCheckQuery = `SELECT * FROM teacher_course WHERE teacher_id = ? AND course_id = ?`;
      const [existingCourseResult] = await db.query(courseCheckQuery, [teacherId, course_id]);

      if (existingCourseResult.length > 0) {
        // 如果课程已存在，则合并班级ID
        const existingClassIds = JSON.parse(existingCourseResult[0].class_id);
        const mergedClassIds = Array.from(new Set([...existingClassIds, ...class_id]));

        // 更新已存在的课程记录，合并班级ID
        const updateClassIdsQuery = `UPDATE teacher_course SET class_id = ? WHERE teacher_id = ? AND course_id = ?`;
        await db.query(updateClassIdsQuery, [JSON.stringify(mergedClassIds), teacherId, course_id]);
      } else {
        // 如果课程没有记录，插入新的记录
        const insertCourseQuery = `INSERT INTO teacher_course (id,teacher_id, course_id, class_id) VALUES (?,?, ?, ?)`;
        await db.query(insertCourseQuery, [id(), teacherId, course_id, JSON.stringify(class_id)]);
      }
    }

    // 返回成功信息
    ctx.body = {
      success: true,
      message: "教师添加成功",
      data: { teacher_id: teacherId },
    };
  } catch (error) {
    console.error(error);
    ctx.body = { success: false, message: "添加教师失败，请稍后再试" };
  }
});

module.exports = router;
