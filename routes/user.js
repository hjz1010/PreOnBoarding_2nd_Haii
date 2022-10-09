const express = require("express");
const userController = require("../controllers/user");
const errorHandler = require("../middlewares/errorHandler");
const middleware = require("../middlewares/file");

const router = express.Router();

router.post("/signUp", errorHandler(userController.signUp));
router.post("/login", asyncWrap(userController.login));
router.patch("/:userId", middleware.verifyToken, errorHandler(userController.updateUser)) ;

module.exports = router;