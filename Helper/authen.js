const appjwt = require("express-jwt");

function AuthenJwt() {
  const api = process.env.api;
  const secret = process.env.secret;
  return appjwt({
    secret,
    algorithms: ["HS256"],
    isRevoked: isRevoked,
  }).unless({
    path: [
      `${api}/users/register`,
      `${api}/users/login`,
      `${api}/products`,
      { url: /\/api\/v1\/category(.*)/, methods: ["GET", "OPTIONS"] },
    ],
  });
}
function isRevoked(req, payload, done) {
  if (!payload.admin) {
    done(null, true);
  }
  done();
}
module.exports = AuthenJwt;
