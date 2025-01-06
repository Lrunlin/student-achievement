const Router = require("koa-router");
const db = require("@/db");
const auth = require("@/modules/auth");
const router = new Router();

// 查询系统详情接口
router.get("/system/details", auth(["a", "s", "t"]), async ctx => {
  try {
    // 获取当前日期和7天前的日期
    const currentDate = new Date();
    const startDate = new Date(currentDate);
    startDate.setDate(currentDate.getDate() - 7); // 7天前的日期

    // 格式化时间为 YYYY-MM-DD HH:mm:ss
    const formatDateTime = date => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const seconds = String(date.getSeconds()).padStart(2, "0");
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

    // 构造过去7天的日期
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const targetDate = new Date(startDate);
      targetDate.setDate(startDate.getDate() + i);
      const formattedDate = formatDateTime(targetDate).split(" ")[0]; // 只取日期部分 YYYY-MM-DD
      dates.push(formattedDate);
    }

    // 查询学生、学院、教师、专业、班级的数量
    const countQuery = `
      SELECT 
        (SELECT COUNT(*) FROM student) AS student_count,
        (SELECT COUNT(*) FROM college) AS college_count,
        (SELECT COUNT(*) FROM teacher) AS teacher_count,
        (SELECT COUNT(*) FROM major) AS major_count,
        (SELECT COUNT(*) FROM class_list) AS class_count
    `;
    const [countResults] = await db.query(countQuery);

    // 使用 Promise.all 来并行查询过去7天每天的新增学生数量
    const studentCountPromises = dates.map(date => {
      const query = `
        SELECT COUNT(*) AS count
        FROM student
        WHERE create_time <= ?
      `;
      return db.query(query, [date]).then(([rows]) => {
        return {
          date,
          count: rows[0]?.count || 0,
        };
      });
    });

    // 执行所有查询
    const studentCountChange = await Promise.all(studentCountPromises);

    // 返回系统详情和学生数量变化
    ctx.body = {
      success: true,
      data: {
        systemStats: countResults[0],
        studentCountChange,
      },
    };
  } catch (error) {
    console.error("查询系统详情失败:", error);
    ctx.body = { success: false, message: "查询系统详情失败，请稍后再试" };
  }
});

module.exports = router;
