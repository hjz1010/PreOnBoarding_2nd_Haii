const express = require("express");
const fileMiddleware = require("../middlewares/file");
const downloadController = require("../controllers/download");
const errorHandler = require("../middlewares/errorHandler");

const router = express.Router();

router.get("", errorHandler(fileMiddleware.verifyToken), errorHandler(downloadController.download));

router.use((req, res, next) => {
  res.status(404).json("Not Found");
});

module.exports = router;
