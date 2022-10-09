//const router = require("express");
const jwt = require("jsonwebtoken");
const { BaseError } = require("../middlewares/appError");

const verifyToken = async (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    throw new BaseError("유저 인증이 필요합니다.", 403);
  } else {
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        throw new BaseError("인증에 실패하였습니다.", 403);
      } else {
        req.userId = decoded.user_id;
        req.userTypeId = decoded.type_id;
      }
    });
    if (!req.userId) {
      throw new BaseError("유저 아이디가 없습니다.", 403);
    }
  }
  next();
};

module.exports = { verifyToken };