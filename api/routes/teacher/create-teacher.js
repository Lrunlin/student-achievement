const express = require("express");
const app = express();
const router = express.Router();

const mysql = require("../../mysql");

router.post("/create-teacher", (req, res) => {
  let sql = `INSERT INTO teacher ( id, password,name,sex,tel,subject,time )
                       VALUES
                       ('${req.body.id}', '123456', '${req.body.name}', '${req.body.sex}', '${req.body.tel}', '${req.body.subject}', NOW());
                       `;
  mysql.query(sql, function (err, result) {
    res.json({
      res: typeof result == "object",
      id: req.body.id,
    });
  });
});
module.exports = router;
