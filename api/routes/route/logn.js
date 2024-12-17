const express = require("express");
const app = express();
const router = express.Router();

const mysql = require("../../mysql");

router.post("/logn", async (req, res) => {
  try {
    let sql = `select * from ${req.body.col} where id='${req.body.id}' and password='${req.body.password}';`;
    let [result] = await mysql.query(sql);
    res.json({
      res: result?.length == 1,
      id: req.body.col,
      user: req.body.id,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
