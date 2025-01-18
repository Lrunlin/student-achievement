const Router = require("koa-router");
const db = require("@/db"); // 数据库查询模块
const router = new Router();
const auth = require("@/modules/auth"); // 权限模块

router.get(["/teacher-tree", "/teacher-tree/:teacherId"], auth(["a", "t"]), async ctx => {
  const teacherId = ctx.id || ctx.params.teacherId; // 教师ID

  try {
    // 查询 option 表获取当前学期
    const semesterQuery = "SELECT value FROM options WHERE `key` = 'semester' LIMIT 1;";
    const [semesterResult] = await db.query(semesterQuery);

    if (!semesterResult || semesterResult.length === 0) {
      ctx.body = {
        success: false,
        message: "无法获取学期信息，请检查配置",
      };
      return;
    }

    const semester = semesterResult[0].value;

    // 查询教师所教的专业、课程（按学期过滤）、班级、学生和成绩数据
    const query = `
      SELECT 
        m.id AS major_id,
        m.name AS major_name,
        c.id AS course_id,
        c.name AS course_name,
        c.total_score AS course_total_score,
        cl.id AS class_id,
        cl.index AS class_index,
        s.id AS student_id,
        s.name AS student_name,
        s.age AS student_age,
        s.sex AS student_sex,
        sc.score AS student_score
      FROM teacher_course tc
      JOIN course c ON tc.course_id = c.id AND c.semester = ?
      JOIN major m ON c.major = m.id
      JOIN class_list cl ON JSON_CONTAINS(tc.class_id, CAST(cl.id AS JSON), '$')
      LEFT JOIN student s ON cl.id = s.class_id
      LEFT JOIN score sc ON s.id = sc.student_id AND c.id = sc.course_id
      WHERE tc.teacher_id = ?
      ORDER BY m.id, c.id, cl.id, s.id;
    `;

    const [result] = await db.query(query, [semester, teacherId]);

    // 构建树形结构
    const tree = {};
    result.forEach(row => {
      const {
        major_id,
        major_name,
        course_id,
        course_name,
        course_total_score,
        class_id,
        class_index,
        student_id,
        student_name,
        student_age,
        student_sex,
        student_score,
      } = row;

      // 专业层级
      if (!tree[major_id]) {
        tree[major_id] = {
          major_id,
          major_name,
          course_data: {},
        };
      }

      // 课程层级
      if (!tree[major_id].course_data[course_id]) {
        tree[major_id].course_data[course_id] = {
          course_id,
          course_name,
          course_total_score,
          class_data: {},
        };
      }

      // 班级层级
      if (!tree[major_id].course_data[course_id].class_data[class_id]) {
        tree[major_id].course_data[course_id].class_data[class_id] = {
          class_id,
          class_index,
          student_data: [],
        };
      }

      // 学生数据
      if (student_id) {
        tree[major_id].course_data[course_id].class_data[class_id].student_data.push({
          student_id,
          student_name,
          student_age,
          student_sex,
          student_score,
        });
      }
    });

    // 转换树形结构为数组
    const treeArray = Object.values(tree).map(major => ({
      ...major,
      course_data: Object.values(major.course_data).map(course => ({
        ...course,
        class_data: Object.values(course.class_data),
      })),
    }));

    ctx.body = {
      success: true,
      message: "查询成功",
      data: treeArray,
    };
  } catch (error) {
    console.error(error);
    ctx.body = {
      success: false,
      message: "查询失败，请稍后再试",
    };
  }
});

module.exports = router;
