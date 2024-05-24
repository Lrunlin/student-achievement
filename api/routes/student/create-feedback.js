const express = require("express");
const { id } = require("node-server-tool");
const app = express();
const router = express.Router();

const mysql = require("../../mysql");

router.post("/feedback/:id", (req, res) => {
  let stu = req.params.id;
  let sql = `
    INSERT INTO feedback (id,student_content,stu_id,create_time) 
    VALUES (${id()}, '${req.body.content}','${stu}', NOW())
  `;
  mysql.query(sql, function (err, result) {
    res.json({
      success: !!result?.affectedRows,
    });
  });
});
module.exports = router;
