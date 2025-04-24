const Joi = require("joi");
const { objectId } = require("./customValidation");

exports.createBlog = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
  }),
};

exports.editBlog = {
  params: Joi.object().keys({
    blogId: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object().keys({
    title: Joi.string(),
    description: Joi.string(),
  }),
};

exports.deleteBlog = {
  params: Joi.object().keys({
    blogId: Joi.string().custom(objectId).required(),
  }),
};

exports.allBlogs = {
  query: Joi.object().keys({
    page: Joi.number(),
    limit: Joi.number(),
  }),
};

exports.getBlog = {
  params: Joi.object().keys({
    blogId: Joi.string().custom(objectId).required(),
  }),
};
