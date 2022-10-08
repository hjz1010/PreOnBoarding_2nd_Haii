const userService = require("../services/user");

const login = async (req, res) => {
  const { account, password } = req.body.data

  if (!account || !password ) {
    res.status(400).json({message: '아이디와 비밀번호를 입력해주세요.'})
  }
  const token = await userService.login(account, password)
  res.status(200).json({message: '로그인 성공!', token: token})

};

module.exports = {
  login,
};
