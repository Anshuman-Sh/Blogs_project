const jwt = require("jsonwebtoken");
const config = require("../config/config.js");
const moment = require("moment");
const { TOKEN_TYPE, USER_TYPE } = require("../config/appConstants.js");
const Token = require("../models/token.js");
const ObjectId = require("mongodb").ObjectId;

const saveToken = async (data) => {
  const dataToBeSaved = {
    _id: data.tokenId,
    type: data.tokenType,
    expires: data.tokenExpires.toDate(),
    role: data.userType,
    token: data.token,
  };
  if (data.userType === USER_TYPE.ADMIN) {
    dataToBeSaved.admin = data.user._id;
  } else {
    dataToBeSaved.user = data.user._id;
  }

  const tokenDoc = await Token.create(dataToBeSaved);
  return tokenDoc;
};

const generateAuthToken = async (user, userType) => {
  const tokenExpires = moment().add(config.jwt.accessExpirationDays, "days");
  const tokenId = new ObjectId();
  const payload = {
    id: tokenId,
    exp: tokenExpires.unix(),
    type: TOKEN_TYPE.ACCESS,
    role: userType,
  };

  const accessToken = jwt.sign(payload, config.jwt.secret_key);

  await saveToken({
    tokenId,
    token: accessToken,
    tokenType: TOKEN_TYPE.ACCESS,
    userType,
    user,
    tokenExpires,
  });
  return {
    token: accessToken,
    expires: tokenExpires,
  };
};

module.exports = { generateAuthToken };
