const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userDao = require("../models/user");
const secretKey = process.env.secretKey

const login = async (account, password) => {

  const user = await userDao.getUserByAccount(account)
  if (!user) {
    const error = new Error('아이디와 비밀번호를 확인해주세요.')
    error.statusCode = 400
    throw error
  }
  const isPasswordCorrect = bcrypt.compareSync(password, user.password)

  if (!isPasswordCorrect) {
    const error = new Error('아이디와 비밀번호를 확인해주세요.')
    error.statusCode = 400
    throw error
  }
  // 토큰 완료시간 1시간으로 설정
  const accessToken = jwt.sign({user_id: user.id}, secretKey, {expiresIn: '1h'})
  // 리프레시 토큰은 만료시간 14일
  const refreshToken = jwt.sign({}, secretKey, {expiresIn: '14d'})

  await userDao.createRefreshToken(refreshToken, user.id) 

  const token = [ accessToken, refreshToken ]
  return token;
};

module.exports = {
  login,
};
