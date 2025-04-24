const { STATUS_CODES, ERROR_MESSAGES } = require("../config/appConstants");
const { NotFoundError } = require("../utils/errors");
const { errorResponse } = require("../utils/response");

const errorHandler = (error, req, res, next) => {
  return errorResponse(error, req, res);
};

const routeNotFoundError = (req, res, next) => {
  return errorResponse(
    new NotFoundError(STATUS_CODES.NOT_FOUND, ERROR_MESSAGES.ROUTE_NOT_FOUND),
    req,
    res
  );
};

module.exports = {
  errorHandler,
  routeNotFoundError
};
