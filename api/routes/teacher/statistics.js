const express = require("express");
const router = express.Router();
const mysql = require("../../mysql");

function key(val) {
  let value;
  switch (val) {
    case "创新与实践":
      value = "innovate";
      break;
    case "马克思主义思想":
      value = "marx";
      break;
    case "高等数学":
      value = "math";
      break;
    case "VUE.js":
      value = "vue";
      break;
    case "Node.js":
      value = "node";
      break;
    case "MySQL数据库":
      value = "mysql";
      break;
  }
  return value;
}
function generateRandomNumber() {
  return parseFloat((Math.random() * 9 + 1).toFixed(2));
}
router.get("/statistics/:teacher_id", async (req, res) => {
  let id = req.params.teacher_id;
  try {
    let [result] = await mysql.query(`select subject from teacher where id="${id}"`);
    let subject = result[0].subject;
    let [_result] = await mysql.query(`select ${key(subject)} from achievement`);
    res.json({
      data: _result.reduce((total, item) => {
        if (item[key(subject)]) {
          let _total = total;
          _total.push([generateRandomNumber(), +item[key(subject)]]);
          return _total;
        } else {
          return total;
        }
      }, []),
    });
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
