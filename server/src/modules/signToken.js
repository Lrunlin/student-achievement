let jwt = require("jsonwebtoken");
function sign(obj) {
  const token = jwt.sign(obj, process.env.KEY);
  return token;
}
module.exports = sign;
