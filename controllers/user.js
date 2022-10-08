const userService = require("../services/user");

const signUp = async (req, res) => {
  const { account, password, name, phone_number, user_type_id, provider_institution_id } = req.body;
  await userService.signUp(account, password, name, phone_number, user_type_id, provider_institution_id);
  res.status(201).json({ message: "회원가입 성공" });
};

const login = async (req, res) => {
  const { account, password } = req.body.data;

  if (!account || !password) {
    res.status(400).json({ message: "이메일과 비밀번호를 모두 입력해주세요." });
  }
  const token = await userService.login(account, password);
  res.status(200).json({ message: "로그인 성공!", token: token });
};

module.exports = {
  signUp,
  login,
};
