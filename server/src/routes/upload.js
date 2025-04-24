let Router = require("koa-router");
let multer = require("@koa/multer");
const fs = require("fs");
const path = require("path");
let { uuid } = require("lodash-toolkit");

let router = new Router();

// 要检查并创建的文件夹路径
const dirPath = path.join("public", "image");
let exist = fs.existsSync(dirPath);
if (!exist) {
  fs.mkdirSync(dirPath);
}

let uploadOption = multer({
  storage: multer.memoryStorage(),
  limits: {
    files: 1,
    fileSize: 1024 * 1024 * 50, //50MB
  },
});
router.post("/static", uploadOption.single("image"), async ctx => {
  try {
    let buffer = ctx.file.buffer;
    let fileName = `${uuid().replace(/-/g, "")}.${ctx.file.originalname.split(".").slice(-1)[0]}`;
    fs.writeFileSync(`public/image/${fileName}`, buffer);
    ctx.body = { success: true, message: "上传成功", data: fileName };
  } catch (error) {
    ctx.body = { success: false, message: "上传错误" };
  }
});
module.exports = router;
