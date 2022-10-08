const router = require("express");
const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  const token = req.headers["authorization"];
  try {
    if (!token) {
      let error = new Error("Error: 유저 인증이 필요합니다.");
      error.code = 403;
      throw error;
    } else {
      jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
          let error = new Error("Error: 인증에 실패하였습니다.");
          error.code = 403;
          throw error;
        } else {
          req.userId = decoded.userId;
        }
      });
      if (!req.userId) {
        let error = new Error("Error: 유저 아이디가 없습니다.");
        error.code = 403;
        throw error;
      }
    }
    next();
  } catch (err) {
    console.log(err);
    res.status(err.code || 500).json({ message: err.message });
  }
};

const downloadExcel = async (req, res) => {
  console.log("dㅡ아이ㅏ먼이ㅏㄹㄴㅁ");
  try {
    // app.get("/file", function (req, res) {
    //   res.send('<file src="/download.xlsx">');
    // });
    res.status(200).json({ message: "파일이 다운로드 되었습니다." });
  } catch (err) {
    console.log(err);
    res.status(err.code || 500).json({ message: err.message });
  }
};

module.exports = { verifyToken, downloadExcel };
