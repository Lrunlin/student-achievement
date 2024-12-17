const express = require("express");
const app = express();
const router = express.Router();

const mysql = require("../../mysql");

router.post("/delete-user", async (req, res) => {
  try {
    let sql = `delete from ${req.body.col} where id='${req.body.id}';`;
    let [result] = await mysql.query(sql);
    res.json({
      res: typeof result == "object",
    });
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
