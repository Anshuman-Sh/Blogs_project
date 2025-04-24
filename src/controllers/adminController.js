const {
  USER_TYPE,
  STATUS_CODES,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
} = require("../config/appConstants.js");
const Token = require("../models/token.js");
const Admin = require("../models/admin.js");
const { generateAuthToken } = require("../services/token.services.js");
const { OperationalError } = require("../utils/errors.js");
const { successResponse } = require("../utils/response.js");
const { catchAsync } = require("../utils/universalFunction.js");

const adminLogin = catchAsync(async (req, res) => {
  const admin = await Admin.findOne({ email: req.body.email });

  if (!admin) {
    throw new OperationalError(
      STATUS_CODES.ACTION_FAILED,
      ERROR_MESSAGES.EMAIL_NOT_FOUND
    );
  }

  if (!(await admin.isPasswordMatch(req.body.password))) {
    throw new OperationalError(
      STATUS_CODES.ACTION_FAILED,
      ERROR_MESSAGES.WRONG_PASSWORD
    );
  }

  const token = await generateAuthToken(admin, USER_TYPE.ADMIN);

  return successResponse(
    req,
    res,
    STATUS_CODES.SUCCESS,
    SUCCESS_MESSAGES.SUCCESS,
    { token, admin }
  );
});

const changePassword = catchAsync(async (req, res) => {
  const admin = await Admin.findById({ _id: req.token.admin._id });

  if (!(await admin.isPasswordMatch(req.body.oldPassword))) {
    throw new OperationalError(
      STATUS_CODES.ACTION_FAILED,
      ERROR_MESSAGES.WRONG_PASSWORD
    );
  }

  let updatedPassword = { password: req.body.newPassword };

  Object.assign(admin, updatedPassword);
  await admin.save();

  return successResponse(
    req,
    res,
    STATUS_CODES.SUCCESS,
    SUCCESS_MESSAGES.SUCCESS,
    { admin }
  );
});

const logout = catchAsync(async (req, res) => {
  const token = await Token.findOne({ _id: req.token._id, isDeleted: false });

  if (!token) {
    throw new OperationalError(
      STATUS_CODES.ACTION_FAILED,
      ERROR_MESSAGES.AUTHENTICATION_FAILED
    );
  }

  await Token.updateOne(
    { _id: req.token._id, isDeleted: false },
    { $set: { isDeleted: true } }
  );

  return successResponse(
    req,
    res,
    STATUS_CODES.SUCCESS,
    SUCCESS_MESSAGES.SUCCESS
  );
});

module.exports = { adminLogin, changePassword, logout };
