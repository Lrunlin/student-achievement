const express = require("express");
const { id } = require("node-db-mysql");
const app = express();
const router = express.Router();

const mysql = require("../../mysql");

router.post("/feedback/:id", async (req, res) => {
  try {
    let stu = req.params.id;
    let sql = `
    INSERT INTO feedback (id,student_content,stu_id,create_time) 
    VALUES (${id()}, '${req.body.content}','${stu}', NOW())
  `;
    let [result] = await mysql.query(sql);

    res.json({
      success: !!result?.affectedRows,
    });
  } catch (error) {
    console.log(errot);
  }
});
module.exports = router;
