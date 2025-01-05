const Router = require("koa-router");
const db = require("@/db"); // 假设你的数据库查询模块
const auth = require("@/modules/auth"); // 引入 auth 模块
const router = new Router();

// 查询教师列表
router.get("/teacher", auth(["a"]), async ctx => {
  try {
    // 获取分页参数
    const page = parseInt(ctx.query.page) || 1;
    const limit = parseInt(ctx.query.limit) || 10;
    const offset = (page - 1) * limit;

    // 获取查询条件
    const { name, course_id, class_id, teacher_id, college_id } = ctx.query;

    // 构建查询条件
    let conditions = [];
    let params = [];

    // 根据教师名字进行模糊查询
    if (name) {
      conditions.push("teacher.name LIKE ?");
      params.push(`%${name}%`);
    }

    // 根据课程ID进行查询
    if (course_id) {
      conditions.push("teacher_course.course_id = ?");
      params.push(course_id);
    }

    // 根据班级ID进行查询
    if (class_id) {
      conditions.push("JSON_CONTAINS(teacher_course.class_id, JSON_QUOTE(?))");
      params.push(class_id);
    }

    // 根据教师ID进行查询
    if (teacher_id) {
      conditions.push("teacher.id = ?");
      params.push(teacher_id);
    }

    // 根据学院ID进行查询
    if (college_id) {
      conditions.push("teacher.college_id = ?");
      params.push(college_id);
    }

    // 构建最终查询语句
    let query = `
      SELECT 
        teacher.id, 
        teacher.name, 
        teacher.age, 
        teacher.sex, 
        teacher.college_id,
        college.name AS college_name  -- 获取学院名称
      FROM teacher
      LEFT JOIN teacher_course ON teacher.id = teacher_course.teacher_id
      LEFT JOIN college ON teacher.college_id = college.id  -- 联接学院表
      ${conditions.length > 0 ? "WHERE " + conditions.join(" AND ") : ""}
      LIMIT ? OFFSET ?
    `;

    // 添加分页参数
    params.push(limit, offset);

    // 查询教师信息
    const [teachers] = await db.query(query, params);

    if (teachers.length === 0) {
      ctx.body = { success: false, message: "没有找到符合条件的教师", data: [] };
      return;
    }

    // 遍历所有教师，查询每个教师所教的课程和对应的班级
    const result = [];

    for (const teacher of teachers) {
      const teacherId = teacher.id;

      // 查询该教师所教的所有课程及其班级
      const courseQuery = `
        SELECT 
          teacher_course.course_id, 
          teacher_course.class_id, 
          course.name AS course_name
        FROM teacher_course
        LEFT JOIN course ON teacher_course.course_id = course.id
        WHERE teacher_course.teacher_id = ?
      `;

      const [courses] = await db.query(courseQuery, [teacherId]);

      // 如果没有课程信息，跳过当前教师
      if (courses.length === 0) {
        result.push({
          id: teacher.id,
          name: teacher.name,
          age: teacher.age,
          sex: teacher.sex,
          college_id: teacher.college_id,
          college_name: teacher.college_name, // 返回学院名称
          course_data: [],
        });
        continue;
      }

      // 格式化每个教师的课程数据
      const courseData = [];

      for (const course of courses) {
        // 确保 class_id 格式正确，如果是字符串的话先尝试解析为数组
        let classIdArray = [];

        try {
          // 尝试解析 class_id 字符串为 JSON 格式的数组
          classIdArray = course.class_id;
        } catch (e) {
          // 如果 JSON 解析失败，将 class_id 视为逗号分隔的字符串，转为数组
          classIdArray = course.class_id.split(",").map(id => parseInt(id.trim(), 10));
        }

        // 查询班级的详细信息
        const classDetails = [];
        if (classIdArray.length > 0) {
          for (const classId of classIdArray) {
            const classQuery = `
              SELECT 
                class_list.id AS class_id,
                class_list.index AS class_index,
                major.name AS major_name
              FROM class_list
              LEFT JOIN major ON class_list.major_id = major.id
              WHERE class_list.id = ?
            `;

            const [classInfo] = await db.query(classQuery, [classId]);
            if (classInfo.length > 0) {
              classDetails.push({
                class_id: classInfo[0].class_id,
                class_index: classInfo[0].class_index,
                major_name: classInfo[0].major_name,
              });
            }
          }
        }

        // 将课程数据格式化
        courseData.push({
          course_id: course.course_id,
          course_name: course.course_name,
          class_data: classDetails, // 返回详细的班级数据
        });
      }

      // 将教师数据和课程数据组合
      result.push({
        id: teacher.id,
        name: teacher.name,
        age: teacher.age,
        sex: teacher.sex,
        college_id: teacher.college_id,
        college_name: teacher.college_name, // 返回学院名称
        course_data: courseData,
      });
    }

    // 返回分页结果
    ctx.body = {
      success: true,
      message: "查询成功",
      data: result,
      page: page,
      limit: limit,
    };
  } catch (error) {
    console.error(error);
    ctx.body = { success: false, message: "查询失败，请稍后再试" };
  }
});

module.exports = router;
