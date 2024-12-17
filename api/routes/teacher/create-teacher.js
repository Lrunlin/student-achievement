const express = require("express");
const app = express();
const router = express.Router();

const mysql = require("../../mysql");

router.post("/create-teacher", async (req, res) => {
  let sql = `INSERT INTO teacher ( id, password,name,sex,tel,subject,time )
                       VALUES
                       ('${req.body.id}', '123456', '${req.body.name}', '${req.body.sex}', '${req.body.tel}', '${req.body.subject}', NOW());
                       `;
  try {
    let [result] = await mysql.query(sql);
    res.json({
      res: typeof result == "object",
      id: req.body.id,
    });
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
