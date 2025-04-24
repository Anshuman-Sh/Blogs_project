const {
  STATUS_CODES,
  SUCCESS_MESSAGES,
  ERROR_MESSAGES,
} = require("../config/appConstants");
const Blog = require("../models/blog");
const { NotFoundError } = require("../utils/errors");
const { successResponse } = require("../utils/response");
const { catchAsync, paginationOptions } = require("../utils/universalFunction");

const createBlog = catchAsync(async (req, res) => {
  const result = await Blog.create({
    title: req.body.title,
    description: req.body.description,
    createdBy: req.token.user._id,
  });

  return successResponse(
    req,
    res,
    STATUS_CODES.CREATED,
    SUCCESS_MESSAGES.CREATED,
    result
  );
});

const editBlog = catchAsync(async (req, res) => {
  const blog = await Blog.findOne({ _id: req.params.blogId, isDeleted: false });

  if (!blog) {
    throw new NotFoundError(
      STATUS_CODES.NOT_FOUND,
      ERROR_MESSAGES.BLOG_NOT_FOUND
    );
  }

  const updatedBlog = await Blog.findOneAndUpdate(
    { _id: blog._id, isDeleted: false },
    { $set: req.body },
    { new: true, lean: true }
  );

  return successResponse(
    req,
    res,
    STATUS_CODES.SUCCESS,
    SUCCESS_MESSAGES.SUCCESS,
    updatedBlog
  );
});

const deleteBlog = catchAsync(async (req, res) => {
  const blog = await Blog.findOne({ _id: req.params.blogId, isDeleted: false });

  if (!blog) {
    throw new NotFoundError(
      STATUS_CODES.NOT_FOUND,
      ERROR_MESSAGES.BLOG_NOT_FOUND
    );
  }

  await Blog.updateOne(
    { _id: blog._id, isDeleted: false },
    { $set: { isDeleted: true } }
  );

  return successResponse(
    req,
    res,
    STATUS_CODES.SUCCESS,
    SUCCESS_MESSAGES.SUCCESS
  );
});

const getAllBlogs = catchAsync(async (req, res) => {
  const { page, limit } = req.query;
  const blogs = await Blog.find(
    {
      createdBy: req.token.user._id,
      isDeleted: false,
    },
    {},
    paginationOptions(page, limit)
  );

  return successResponse(
    req,
    res,
    STATUS_CODES.SUCCESS,
    SUCCESS_MESSAGES.SUCCESS,
    blogs
  );
});

const getBlog = catchAsync(async (req, res) => {
  const blog = await Blog.findOne({
    _id: req.params.blogId,
    isDeleted: false,
  });

  if (!blog) {
    throw new NotFoundError(
      STATUS_CODES.NOT_FOUND,
      ERROR_MESSAGES.BLOG_NOT_FOUND
    );
  }

  return successResponse(
    req,
    res,
    STATUS_CODES.SUCCESS,
    SUCCESS_MESSAGES.SUCCESS,
    blog
  );
});

module.exports = { createBlog, editBlog, deleteBlog, getAllBlogs, getBlog };
