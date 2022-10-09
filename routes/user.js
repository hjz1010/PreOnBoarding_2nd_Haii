const express = require("express");
const userController = require("../controllers/user");
const errorHandler = require("../middlewares/errorHandler");
const middleware = require("../middlewares/file");

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
router.patch("/:userId", middleware.verifyToken, errorHandler(userController.updateUser)) ;

module.exports = router;