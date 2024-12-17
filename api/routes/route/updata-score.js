const express = require("express");
const app = express();
const router = express.Router();

const mysql = require("../../mysql");

router.post("/updata-score", async (req, res) => {
  try {
    let sql = `UPDATE achievement SET ${req.body.subject}='${req.body.score}' where stucode='${req.body.id}';`;
    let [result] = await mysql.query(sql);
    res.json({
      res: result,
    });
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
