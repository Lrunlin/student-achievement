const express = require('express')
const app = express()
const router = express.Router();

const mysql = require('../mysql')

router.post('/delete-user', (req, res) => {
    let sql = `delete from ${req.body.col} where id='${req.body.id}';`
    mysql.query(sql, function (err, result) {
        res.json({
            res: typeof result == "object",
        })
    });
})
module.exports = router;