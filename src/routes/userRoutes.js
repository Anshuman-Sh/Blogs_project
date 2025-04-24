const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { validate } = require("../middlewares/validate");
const { signup, login, editProfile } = require("../validations/userValidation");
const { auth } = require("../middlewares/auth");

router.post("/signup", validate(signup), userController.signup);

router.post("/login", validate(login), userController.login);

router.put(
  "/editProfile",
  auth(),
  validate(editProfile),
  userController.editProfile
);

router.post("/logout", auth(), userController.logout);

module.exports = router;
