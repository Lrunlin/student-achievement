const Router = require("koa-router");
const db = require("@/db"); // 假设 db 是已配置好的数据库模块
const xlsx = require("node-xlsx"); // 引入 node-xlsx 插件
const fs = require("fs");
const path = require("path");
const router = new Router();
const auth = require("@/modules/auth"); // 权限模块

// 要检查并创建的文件夹路径
const dirPath = path.join("public", "xlsx");
let exist = fs.existsSync(dirPath);
if (!exist) {
  fs.mkdirSync(dirPath);
}
//删除之前的表格
fs.readdirSync(dirPath).forEach(item => {
  if (item.endsWith(".xlsx")) {
    fs.unlinkSync(path.join(dirPath, item));
  }
});

// 根据课程ID和班级ID生成成绩表格接口
router.get("/generate-grade-sheet", auth(["a", "t"]), async ctx => {
  const { course_id, class_id } = ctx.query; // 获取课程ID和班级ID参数

  if (!course_id || !class_id) {
    ctx.body = { success: false, message: "缺少课程ID或班级ID参数" };
    return;
  }

  try {
    // 查询班级学生成绩
    const query = `
      SELECT s.id AS student_id, s.name AS student_name, c.name AS course_name, g.score
      FROM student s
      JOIN score g ON s.id = g.student_id
      JOIN course c ON c.id = g.course_id
      WHERE g.course_id = ? AND s.class_id = ?
    `;

    const [result] = await db.query(query, [course_id, class_id]);

    if (result.length === 0) {
      ctx.body = { success: false, message: "没有找到相关成绩数据" };
      return;
    }

    let [classData] = await db.query(`select * from class_list where id=?`, [class_id]);
    let [courseData] = await db.query(`select * from course where id=?`, [course_id]);
    let [majorData] = await db.query(`select * from major where id=?`, [courseData[0].major]);

    // 生成表格数据
    const data = [
      ["学号", "姓名", `课程(${courseData[0].name})`, "成绩"], // 表头
      ...result.map(item => [item.student_id, item.student_name, item.course_name, item.score]),
    ];

    // 使用 node-xlsx 生成 Excel 文件
    const buffer = xlsx.build([{ name: "成绩单", data }]);
    let fileName = `${majorData[0].name}(${classData[0].index})班-${
      courseData[0].name
    }成绩-${+new Date()}.xlsx`;
    // 保存 Excel 文件到磁盘
    const filePath = path.join(dirPath, fileName);
    fs.writeFileSync(filePath, buffer);

    // 返回文件下载路径或文件流给客户端
    ctx.body = {
      success: true,
      message: "成绩表生成成功",
      filePath: `/xlsx/${fileName}`, // 文件下载路径（假设你有静态文件服务提供）
    };

    setTimeout(() => {
      fs.mkdirSync(filePath);
    }, 1800000);
  } catch (error) {
    console.error("生成成绩表失败:", error);
    ctx.body = { success: false, message: "生成成绩表失败，请稍后再试" };
  }
});

module.exports = router;
