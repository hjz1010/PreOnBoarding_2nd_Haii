//const router = require("express");
const jwt = require("jsonwebtoken");
const { BaseError } = require("../middlewares/appError");

const verifyToken = async (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    throw new BaseError("유저 인증이 필요합니다.", 403);
  } else {
    const token = req.headers.authorization.split(' ')[1]   // token이 'Bearer eyhdks'로 들어와서 코드 추가함
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