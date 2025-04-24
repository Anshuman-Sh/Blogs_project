const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");
const { auth } = require("../middlewares/auth");
const { validate } = require("../middlewares/validate");
const {
  createBlog,
  editBlog,
  deleteBlog,
  getBlog,
  allBlogs,
} = require("../validations/blogValidation");

router
  .route("/blogs")
  .post(auth(), validate(createBlog), blogController.createBlog)
  .get(auth(), validate(allBlogs), blogController.getAllBlogs);

router
  .route("/blogs/:blogId")
  .put(auth(), validate(editBlog), blogController.editBlog)
  .delete(auth(), validate(deleteBlog), blogController.deleteBlog)
  .get(auth(), validate(getBlog), blogController.getBlog);

module.exports = router;
