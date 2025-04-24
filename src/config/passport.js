const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const config = require("./config");
const { TOKEN_TYPE, USER_TYPE } = require("./appConstants");
const Token = require("../models/token");

const jwtOptions = {
  secretOrKey: config.jwt.secret_key,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (payload, done) => {
  try {
    if (payload.type != TOKEN_TYPE.ACCESS) {
      throw new Error("Authentication Failed");
    }

    // console.log("payload", payload);

    let token = {};

    if (payload.role == USER_TYPE.ADMIN) {
      token = await Token.findOne({
        _id: payload.id,
        isDeleted: false,
      }).populate({ path: "admin" });
    } else {
      token = await Token.findOne({
        _id: payload.id,
        isDeleted: false,
      }).populate({ path: "user" });
    }

    if (!token) {
      return done(null, false);
    }

    // console.log("Token", token);

    done(null, token);
  } catch (error) {
    done(error, false);
  }
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

module.exports = {
  jwtStrategy,
};
