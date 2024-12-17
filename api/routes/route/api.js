const express = require("express");
const app = express();
const router = express.Router();

const mysql = require("../../mysql");

router.post("/api", async (req, res) => {
  try {
    let [result] = await mysql.query(req.body.sql);
    res.json({
      res: result,
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
