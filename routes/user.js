const express = require("express");
const userController = require("../controllers/user");

const router = express.Router();

const asyncWrap = (controller) => {
    return async (req, res, next) => {
        try {
            await controller(req, res)
        } 
        catch (err) {
            next(err)
        }
    }
};

router.post('/login', asyncWrap(userController.login));

module.exports = router;
