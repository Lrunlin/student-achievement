const express = require("express");
const { id } = require("node-server-tool");
const app = express();
const router = express.Router();

const mysql = require("../../mysql");

router.get("/feedback", (req, response) => {
  let data = new Promise(r => {
    mysql.query(`select * from feedback where teacher_content is null;`, (err, res) => {
      let data = JSON.parse(JSON.stringify(res));
      for (let index = 0; index < data.length; index++) {
        const item = res[index];
        mysql.query(`select * from student where id='${item.stu_id}';`, (err, sres) => {
          data[index].stu_data = JSON.parse(JSON.stringify(sres[0]));
          if (data.length == ++index) {
            r(data);
          }
        });
      }
    });
  });
  data.then(res => {
    response.json({
      success: true,
      data: res,
    });
  });
});
module.exports = router;
