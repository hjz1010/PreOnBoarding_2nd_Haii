const userDao = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;
const ISSUER = process.env.ISSUER;

const { validationEmail, validationPassword, validationName, validationPhone } = require("../utils/validation");
const { BaseError } = require("../middlewares/appError");

const signUp = async (account, password, name, phone_number, type_id, region_id) => {
  if (!account || !password || !name || !phone_number || !type_id) {
    throw new BaseError("입력된 값이 없는 항목이 있습니다.", 400);
  }
  validationEmail(account); // 이메일형식 유효성 검사
  validationPassword(password); // 비밀번호형식 유효성 검사
  validationName(name); // 이름 유효성 검사
  validationPhone(phone_number); // 휴대폰번호 유효성 검사

  const isExistAccount = await userDao.existCheckUserByAccount(account); // 가입여부 확인
  if (isExistAccount) {
    throw new Error("이미 존재하는 계정입니다", 400);
  }

  if (type_id === 1 && region_id) {
    throw new Error("담당 지역 형식이 올바르지 않습니다.", 400); // type_id가 1인 경우 - 대표관리자 (담당지역없음)
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  await userDao.createUser(account, hashedPassword, name, phone_number, type_id, region_id);
};

const login = async (account, password) => {
  const user = await userDao.getUserByAccount(account);
  if (!user) {
    const error = new Error("이메일과 비밀번호를 확인해주세요.");
    error.statusCode = 400;
    throw error;
  }
  const isPasswordCorrect = bcrypt.compareSync(password, user.password);

  if (!isPasswordCorrect) {
    const error = new Error("이메일과 비밀번호를 확인해주세요.");
    error.statusCode = 400;
    throw error;
  }
  // 토큰 완료시간 1시간으로 설정
  const accessToken = jwt.sign({ user_id: user.id, type_id: user.type_id }, SECRET_KEY, {
    expiresIn: "1h", 
    issuer: ISSUER 
  });
  // 리프레시 토큰은 만료시간 14일
  const refreshToken = jwt.sign({}, SECRET_KEY, { 
    expiresIn: "14d", 
    issuer: ISSUER 
  });

  await userDao.createRefreshToken(refreshToken, user.id);

  const token = [accessToken, refreshToken];
  return token;
};

module.exports = {
  signUp,
  login,
};
