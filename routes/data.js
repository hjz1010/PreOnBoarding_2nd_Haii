const express = require("express");
const dataController = require("../controllers/data");

const router = express.Router();

router.post("/data", dataController.inputData);

module.exports = router;
