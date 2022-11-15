const userService = require("../services/user");

const signUp = async (req, res) => {
  const { account, password, name, phone_number, user_type_id, provider_institution_id } = req.body;
  await userService.signUp(account, password, name, phone_number, user_type_id, provider_institution_id);
  res.status(201).json({ message: "회원가입 성공" });
};

const login = async (req, res) => {
  const { account, password } = req.body;

  if (!account || !password) {
    return res.status(400).json({ message: "이메일과 비밀번호를 모두 입력해주세요." });
  }
  const token = await userService.login(account, password);
  res.status(200).json({ message: "로그인 성공!", token: token });
};
  
const token = async (req, res) => {
  const access_token = req.headers["authorization"];
  const { refresh_token } = req.body;

  if (!access_token || !refresh_token) {
    return res.status(400).json({ message: "2개의 토큰이 필요합니다." })
  }

  const new_token = await userService.checkRefreshToken(access_token, refresh_token);
  console.log("## new_token: ", new_token )
  res.status(200).json({ message: "새로운 토큰 발행", new_token: new_token })
}

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
  updateUser,
  token
};