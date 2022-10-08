const express = require("express");
const router = express.Router();

const usersRouter = require("./user");
const dataRouter = require("./data");
const downloadRouter = require("./download");

router.use("/users", usersRouter);
router.use("/download", downloadRouter);
router.use("", dataRouter);

module.exports = router;
