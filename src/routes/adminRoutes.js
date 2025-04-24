const router = require("express").Router();
const { USER_TYPE } = require("../config/appConstants");
const adminController = require("../controllers/adminController");
const { validate } = require("../middlewares/validate");
const { auth } = require("../middlewares/auth");
const {
  adminLogin,
  changePassword,
} = require("../validations/adminValidation");

router.post("/login", validate(adminLogin), adminController.adminLogin);

router.put(
  "/changePassword",
  auth(USER_TYPE.ADMIN),
  validate(changePassword),
  adminController.changePassword
);

router.post("/logout", auth(USER_TYPE.ADMIN), adminController.logout);

module.exports = router;
