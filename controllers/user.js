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
  
const updateUser = async (req, res) => {
  // 키값 : name, phone_number, region_id로 입력
  const user_type_id = req.userTypeId;
  const updateData   = req.body;
  const updateUserId = req.params.userId;

  // 대표 관리자만 수정 가능
  await userService.checkUserTypeId(user_type_id)

  // 아이디 ,비밀번호 수정시 => 400
  if (updateData.account || updateData.password) {
    return res
      .status(400)
      .json({ message: "이름, 연락처, 담당 지역만 수정가능합니다." });
  }

  // 데이터를 입력안했을 때 => 400
  Object.keys(updateData).forEach((key) => {
    if (!updateData[key]) {
      return res.status(400).json({ message: "해당 데이터를 입력하세요." });
    }
  });

  await userService.checkUserExist(updateUserId);

  let message;

  if (updateData.name) {
    await userService.updateName(updateUserId, updateData.name)
    message = '이름'
  } else if (updateData.phone_number) {
    await userService.updatePhone(updateUserId, updateData.phone_number)
    message = '연락처'
  } else if (updateData.region_id) {
    await userService.updateRegion(updateUserId, updateData.region_id)
    message = '지역'
  }
  return res.status(200).json({ message: `${message}을/를 수정했습니다.` });
};

module.exports = {
  signUp,
  login,
  updateUser
};