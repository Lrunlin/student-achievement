const Router = require("koa-router");
const db = require("@/db"); // 假设你的数据库查询模块
const router = new Router();
const auth = require("@/modules/auth"); // 引入 auth 模块

router.get("/teacher-info", auth(["a", "t"]), async ctx => {
  try {
    // 获取教师ID
    const teacherId = ctx.query.id || ctx.id;

    if (!teacherId) {
      ctx.body = { success: false, message: "教师ID不能为空" };
      return;
    }

    // 查询教师信息
    const teacherQuery = `
      SELECT 
        teacher.id, 
        teacher.name, 
        teacher.age, 
        teacher.sex, 
        teacher.college_id,
        college.name AS college_name
      FROM teacher
      LEFT JOIN college ON teacher.college_id = college.id
      WHERE teacher.id = ?`;

    const [teacherResult] = await db.query(teacherQuery, [teacherId]);

    if (teacherResult.length === 0) {
      ctx.body = { success: false, message: "未找到指定教师" };
      return;
    }

    const teacher = teacherResult[0];

    // 查询该教师所教的所有课程及其班级
    const courseQuery = `
      SELECT 
        teacher_course.course_id, 
        teacher_course.class_id, 
        course.name AS course_name,
        course.semester AS course_semester
      FROM teacher_course
      LEFT JOIN course ON teacher_course.course_id = course.id
      WHERE teacher_course.teacher_id = ?`;

    const [courses] = await db.query(courseQuery, [teacherId]);

    // 获取班级信息
    const classDetails = [];
    for (const course of courses) {
      const classIdArray = course.class_id;
      const classQuery = `
        SELECT 
          class_list.id AS class_id,
          class_list.index AS class_index,
          major.name AS major_name
        FROM class_list
        LEFT JOIN major ON class_list.major_id = major.id
        WHERE class_list.id IN (?)`;

      const [classInfo] = await db.query(classQuery, [classIdArray]);

      classDetails.push({
        course_id: course.course_id,
        course_name: course.course_name,
        course_semester: course.course_semester,
        class_data: classInfo,
      });
    }

    // 返回查询结果
    ctx.body = {
      success: true,
      message: "查询成功",
      data: {
        teacher: {
          id: teacher.id,
          name: teacher.name,
          age: teacher.age,
          sex: teacher.sex,
          college_id: teacher.college_id,
          college_name: teacher.college_name,
        },
        course_data: classDetails,
      },
    };
  } catch (error) {
    console.error(error);
    ctx.body = { success: false, message: "查询失败，请稍后再试" };
  }
});

module.exports = router;
