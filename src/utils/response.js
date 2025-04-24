const { STATUS_CODES, SUCCESS_MESSAGES } = require("../config/appConstants");
const {
  NotFoundError,
  ValidationError,
  OperationalError,
  AuthFailedError,
} = require("./errors");

const successResponse = (
  req,
  res,
  status = STATUS_CODES.SUCCESS,
  message = SUCCESS_MESSAGES.SUCCESS,
  data
) => {
  return res.status(status).json({ status, message, data });
};

const errorResponse = (error, req, res) => {
  let statusCode =
    error.code ||
    error.statusCode ||
    error.response?.status ||
    STATUS_CODES.ERROR;

  if (statusCode === STATUS_CODES.ERROR) {
    // This clips the constructor invocation from the stack trace.
    // It's not absolutely essential, but it does make the stack trace a little nicer.
    Error.captureStackTrace(error, error.constructor);
  }

  const message =
    error instanceof NotFoundError ||
    error instanceof ValidationError ||
    error instanceof OperationalError ||
    error instanceof AuthFailedError
      ? error.message
      : error.toString();

  return res.status(statusCode || STATUS_CODES.ERROR).json({
    statusCode: statusCode || STATUS_CODES.ERROR,
    message,
    data: error.data,
  });
};

module.exports = { errorResponse, successResponse };
