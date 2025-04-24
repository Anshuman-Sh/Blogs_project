const { pick } = require("../utils/universalFunction");
const { ValidationError } = require("../utils/errors");
const Joi = require("joi");

const validate = (schema) => (req, res, next) => {
  const validSchema = pick(schema, ["params", "query", "body"]);
  const object = pick(req, Object.keys(validSchema));
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: "key" } })
    .validate(object);

  if (error) {
    console.error(error);
    let errorMessage = error.details
      .map((details) => details.message)
      .join(", ")
      .replace(/"/g, "");

    //  return next(new ApiError("en", errorMessage));
    return next(new ValidationError(errorMessage));
  }

  for (const key in value) {
    if (typeof value[key] === "object" && req[key]) {
      Object.assign(req[key], value[key]);
    } else {
      req[key] = value[key];
    }
  }
  return next();
};

module.exports = { validate };
