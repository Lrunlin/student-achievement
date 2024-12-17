const express = require("express");
const app = express();
const router = express.Router();

const mysql = require("../../mysql");

router.post("/read-user", async (req, res) => {
  try {
    let sql = `select * from ${req.body.col} where id='${req.body.id}';`;
    let [result] = await mysql.query(sql);
    res.json({
      res: result,
    });
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
