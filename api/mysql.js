const { mysql2promise } = require("node-db-mysql");

const connection = mysql2promise.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "school",
  multipleStatements: true, //允许多条语句
  // timezone: "SYSTEM", //优化时间格式
});
module.exports = connection;
