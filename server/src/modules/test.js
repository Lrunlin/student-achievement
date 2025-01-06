const jwt = require("jsonwebtoken");

//测试环境限制部分插件

async function verify(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.KEY, async function (err, decoded) {
      if (err) {
        reject();
      } else {
        resolve(decoded);
      }
    });
  });
}

// 创建中间件
async function testEnvMiddleware(ctx, next) {
  const isTestEnv = process.env.NODE_ENV == "test";

  if (!isTestEnv) {
    await next();
    return;
  }

  let decoded = await verify(ctx.headers.authorization)
    .then(res => res)
    .catch(err => ({}));

  // 1. 禁止修改 admin 账号密码
  if (ctx.method == "PUT" && ctx.path == "/admin-password") {
    ctx.status = 403;
    ctx.body = {
      success: false,
      message: "禁止在测试环境修改 admin 账号的密码。",
    };
    return;
  }

  // 2. 禁止删除 ID 为 1 的教师和学生
  if (
    ctx.method == "DELETE" &&
    (ctx.path.startsWith("/teacher/") || ctx.path.startsWith("/student/"))
  ) {
    const id = ctx.params.id;
    if (id == "1" || id == "2") {
      ctx.status = 403;
      ctx.body = {
        success: false,
        message: "禁止在测试环境删除 ID 为 1、2 的教师或学生。",
      };
      return;
    }
  }

  // 3. 禁止访问 POST 请求的 /static 路径
  if (ctx.method == "POST" && ctx.path == "/static") {
    ctx.status = 403;
    ctx.body = {
      success: false,
      message: "禁止在测试环境访问 POST 请求的 /static 路径。",
    };
    return;
  }

  // 4. 禁止修改 ID 为 1 的教师和学生的密码
  if (
    ctx.method == "PUT" &&
    (decoded.id == 1 || decoded.id == 2) &&
    (ctx.path == "/teacher-password" || ctx.path == "/student-password")
  ) {
    ctx.status = 403;
    ctx.body = { success: false, message: "禁止在测试环境修改 ID 为 1、2 的教师或学生的密码。" };
    return;
  }

  // 5. 禁止修改学期
  if (ctx.method == "PUT" && ctx.path == "/semester") {
    ctx.status = 403;
    ctx.body = { success: false, message: "禁止在测试环境修改学期。" };
    return;
  }

  await next();
}
module.exports = testEnvMiddleware;
