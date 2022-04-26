var xlsx = require('node-xlsx').default;
const fs = require('fs')
const express = require('express')
const app = express()
const router = express.Router()

router.post('/teacher-print', (req, res) => {
    const options = {
        '!cols': [{
            wch: 16
        }, {
            wch: 17
        }, {
            wch: 10
        }]
    };
    var buffer = xlsx.build([{
        name: "mySheetName",
        data: req.body.data.data
    }], options); // Returns a buffer
    fs.writeFile(`./excel/${req.body.data.name}.xlsx`, buffer, function (err) {
        console.log(err);
        res.json({
            res: true
        })
    })
})
module.exports = router;