const express = require("express");
const router = express.Router();

const usersRouter = require("./user");
const dataRouter = require("./data.js");

router.use("/users", usersRouter);
router.use("", dataRouter);

module.exports = router;
