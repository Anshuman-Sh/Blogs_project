const passport = require("passport");
const { AuthFailedError } = require("../utils/errors");
const { STATUS_CODES, ERROR_MESSAGES } = require("../config/appConstants");

const verifyCallBack = (req, resolve, reject, role) => (err, token, info) => {
  // console.log("INFO", info);
  // console.log("TOKEN", token);
  // console.log("ERROR", err);

  if (err || info || !token) {
    return reject(new AuthFailedError());
  }

  if (role && token.role != role) {
    return reject(
      new AuthFailedError(STATUS_CODES.AUTH_FAILED, ERROR_MESSAGES.UNAUTHORIZED)
    );
  }

  req.token = token;
  return resolve();
};

const auth = (role) => async (req, res, next) => {
  new Promise((resolve, reject) => {
    passport.authenticate(
      "jwt",
      { session: false },
      verifyCallBack(req, resolve, reject, role)
    )(req, res, next);
  })
    .then(() => next())
    .catch((err) => next(err));
};

module.exports = { auth };
