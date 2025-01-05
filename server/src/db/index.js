let { mysql } = require("node-server-dev");

const connection = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  database: "stu_score",
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
});
module.exports = connection;
