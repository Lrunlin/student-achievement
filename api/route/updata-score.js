const express = require('express')
const app = express()
const router = express.Router();

const mysql = require('../mysql')

router.post('/updata-score', (req, res) => {
    let sql = `UPDATE achievement SET ${req.body.subject}='${req.body.score}' where stucode='${req.body.id}';`
    console.log(sql);
    mysql.query(sql, function (err, result) {
        res.json({
            res: result
        })
    });
})
module.exports = router;