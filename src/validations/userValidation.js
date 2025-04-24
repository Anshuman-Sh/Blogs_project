const Joi = require("joi");

exports.signup = {
  body: Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().allow(""),
    email: Joi.string().email().lowercase().trim().required(),
    password: Joi.string().min(6).required(),
  }),
};

exports.login = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

exports.editProfile = {
  body: Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().allow(""),
    email: Joi.string().email().lowercase().trim().required(),
  }),
};
