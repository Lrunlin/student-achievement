const express = require('express')
const app = express()
const router = express.Router();

const mysql = require('../mysql')

router.post('/logn', (req, res) => {
    let sql=`select * from ${req.body.col} where id='${req.body.id}' and password='${req.body.password}';`
    mysql.query(sql, function (err, result) {
        res.json({
            res: result.length==1,
            id:req.body.col,
            user: req.body.id
        })
    })

})









module.exports = router;