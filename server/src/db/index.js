let mysql = require("mysql2/promise");

const connection = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  database: "stu_score",
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
});
module.exports = connection;
