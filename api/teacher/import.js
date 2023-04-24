const express = require("express");
const app = express();
const router = express.Router();
const fs = require("fs");
const xlsx = require("node-xlsx");
const mysql = require("../mysql");

router.post("/import", (req, res) => {
  let name = Object.keys(req.files)[0];
  const sheets = xlsx.parse(req.files[name].data);
  let data = sheets[0].data;
  data.splice(0, 1);
  data.forEach(function (item) {
    if (!isNaN(+item[2]) && +item[2] > -1 && +item[2] < 101) {
      let sql = `UPDATE achievement SET ${name}='${item[2]}' WHERE stucode='${item[1]}';`;
      mysql.query(sql, function (err, result) {});
    }
  });
  res.json({
    data: [],
  });
});
module.exports = router;
