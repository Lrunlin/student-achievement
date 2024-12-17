const express = require("express");
const app = express();
const router = express.Router();
const fs = require("fs");
const xlsx = require("node-xlsx");
const mysql = require("../../mysql");

router.post("/upload-excel", async (req, res) => {
  let name = Object.keys(req.files)[0];
  let time = new Date().getTime();
  fs.writeFileSync(`./excel/${time}.xlsx`, req.files[name].data);
  let sheets = xlsx.parse(`./excel/${time}.xlsx`); //获取到所有sheets;
  let fromData = [];
  for (let index = 0; index < sheets.length; index++) {
    const sheet = sheets[index];

    sheet["data"].splice(0, 1); //把第一个删掉
    for (var rowId in sheet["data"]) {
      let row = sheet["data"][rowId];
      // 判断成绩范围
      if (+row[2] > -1 && +row[2] < 101) {
        fromData.push({
          name: row[0],
          stucode: row[1],
          score: row[2],
        });
        let sql = `UPDATE achievement SET ${name}='${row[2]}' WHERE stucode='${row[1]}';`;
        let [row] = await mysql.query(sql);
      }
    }
  }

  res.json({
    data: fromData,
  });
  setTimeout(() => {
    fs.unlinkSync(`./excel/${time}.xlsx`);
  }, 10000);
});
module.exports = router;
