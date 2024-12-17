const express = require("express");
const { id } = require("node-db-mysql");
const app = express();
const router = express.Router();

const mysql = require("../../mysql");

router.get("/feedback", async (req, response) => {
  let [res] = await mysql.query(`select * from feedback where teacher_content is null;`);
  let data = JSON.parse(JSON.stringify(res));

  for (let index = 0; index < data.length; index++) {
    const item = res[index];
    let [sres] = await mysql.query(`select * from student where id='${item.stu_id}';`);
    data[index].stu_data = JSON.parse(JSON.stringify(sres[0]));
    if (data.length == ++index) {
      response.json({
        success: true,
        data: data,
      });
    }
  }
});
module.exports = router;
