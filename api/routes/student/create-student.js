const express = require("express");
const app = express();
const router = express.Router();

const mysql = require("../../mysql");

router.post("/create-student", async (req, res) => {
  try {
    let sql = `INSERT INTO student ( id, password,name,sex,tel,class,time )
                       VALUES
                       ('${req.body.id}', '123456', '${req.body.name}', '${req.body.sex}', '${req.body.tel}', '${req.body.class}', NOW());
INSERT INTO achievement (stucode, name, vue, node, marx, innovate, mysql, math, time)
VALUES
    ('${req.body.id}', '${req.body.name}', '', '', '', '', '', '', NOW());
                       `;
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
