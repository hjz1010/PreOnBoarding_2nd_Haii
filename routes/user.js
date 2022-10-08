const express = require("express");
const userController = require("../controllers/user");
const errorHandler = require("../middlewares/errorHandler");

const router = express.Router();

router.post("/signUp", errorHandler(userController.signUp));
router.post("/login", errorHandler(userController.login));

module.exports = router;
