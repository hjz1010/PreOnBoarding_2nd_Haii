const express = require("express");
const middleware = require("../middlewares/file");
const downloadController = require("../controllers/download");

const router = express.Router();

router.get("", middleware.verifyToken, downloadController.download);

router.use((req, res, next) => {
  res.status(404).json("Not Found");
});

module.exports = router;
