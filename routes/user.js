const express = require("express");
const userController = require("../controllers/user");
const errorHandler = require("../middlewares/errorHandler");

const router = express.Router();

const asyncWrap = (controller) => {
  return async (req, res, next) => {
    try {
      await controller(req, res);
    } catch (err) {
      next(err);
    }
  };
};

router.post("/signUp", errorHandler(userController.signUp));
router.post("/login", asyncWrap(userController.login));

module.exports = router;
