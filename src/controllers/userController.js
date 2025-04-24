const {
  USER_TYPE,
  STATUS_CODES,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
} = require("../config/appConstants.js");
const Token = require("../models/token.js");
const User = require("../models/user.js");
const { generateAuthToken } = require("../services/token.services.js");
const { OperationalError } = require("../utils/errors.js");
const { successResponse } = require("../utils/response.js");
const { catchAsync } = require("../utils/universalFunction.js");

const signup = catchAsync(async (req, res) => {
  if (await User.findOne({ email: req.body.email })) {
    throw new OperationalError(
      STATUS_CODES.ACTION_FAILED,
      ERROR_MESSAGES.EMAIL_ALREADY_EXIST
    );
  }

  const user = await User.create(req.body);

  const token = await generateAuthToken(user, USER_TYPE.USER);

  return successResponse(
    req,
    res,
    STATUS_CODES.CREATED,
    SUCCESS_MESSAGES.CREATED,
    { user, token }
  );
});

const login = catchAsync(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    throw new OperationalError(
      STATUS_CODES.ACTION_FAILED,
      ERROR_MESSAGES.EMAIL_NOT_FOUND
    );
  }

  if (!(await user.isPasswordMatch(req.body.password))) {
    throw new OperationalError(
      STATUS_CODES.ACTION_FAILED,
      ERROR_MESSAGES.WRONG_PASSWORD
    );
  }

  const token = await generateAuthToken(user, USER_TYPE.USER);
  return successResponse(
    req,
    res,
    STATUS_CODES.SUCCESS,
    SUCCESS_MESSAGES.SUCCESS,
    token
  );
});

const editProfile = catchAsync(async (req, res) => {
  const user = await User.findOne({ _id: req.token.user._id });

  if (!user) {
    throw new OperationalError(
      STATUS_CODES.ACTION_FAILED,
      ERROR_MESSAGES.ACCOUNT_NOT_EXIST
    );
  }

  const updatedProfile = await User.findOneAndUpdate(
    { _id: user._id },
    { $set: req.body },
    { new: true, lean: true }
  );

  return successResponse(
    req,
    res,
    STATUS_CODES.SUCCESS,
    SUCCESS_MESSAGES.SUCCESS,
    updatedProfile
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

module.exports = { signup, login, editProfile, logout };
