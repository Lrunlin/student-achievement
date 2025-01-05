const fs=require('fs')
const path = require("path");

async function fileDisplay(filePath) {
  let fileList = [];
  function _fileDisplay(filePath) {
    let files = fs.readdirSync(filePath);
    for (let index = 0; index < files.length; index++) {
      let filename = files[index];
      let filedir = path.join(filePath, filename); //拼接路径用于app.use
      let stats = fs.statSync(filedir);
      let isFile = stats.isFile();
      let isDir = stats.isDirectory();
      if (isFile) {
        fileList.push(filedir);
      }
      if (isDir) {
        _fileDisplay(filedir);
      }
    }
  }
  _fileDisplay(filePath);
  return fileList;
}
let src = path.join(__dirname, "../routes");
async function getAllRouter() {
  let fileList = await fileDisplay(src);
  return fileList;
}
module.exports = getAllRouter;
