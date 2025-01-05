let jwt = require("jsonwebtoken");

async function verify(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.KEY, async function (err, decoded) {
      if (err) {
        reject();
      } else {
        resolve(decoded);
      }
    });
  });
}

function auth(arr) {
  return async (ctx, next) => {
    let token = ctx.headers.authorization;

    if (!token) {
      ctx.status = 401;
      return;
    }

    await verify(token)
      .then(async decoded => {
        if (arr) {
          if (!["a", ...arr].some(item => decoded.type.startsWith(item))) {
            ctx.status = 401;
            return;
          }
        }
        ctx.id = decoded.id;
        ctx.auth = decoded.type;
        ctx.username = decoded.username;
        await next();
      })
      .catch(err => {
        ctx.status = 401;
      });
  };
}
module.exports = auth;
