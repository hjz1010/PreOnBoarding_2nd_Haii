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
  validationEmail(account);
  validationPassword(password);
  validationName(name);
  validationPhone(phone_number);

  const isExistAccount = await userDao.existCheckUserByAccount(account);
  if (isExistAccount) {
    throw new BaseError("이미 존재하는 계정입니다", 400);
  }

  if (type_id === 1 && region_id) {
    throw new BaseError("담당 지역 형식이 올바르지 않습니다.", 400);
  }

  if (type_id > 2) {
    throw new BaseError("존재하지 않는 유저타입 입니다.", 404);
  }

  const checkExistRegionId = await userDao.getRegionById(region_id);
  if (!checkExistRegionId) {
    throw new BaseError("존재하지 않는 지역ID 입니다.", 404);
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  await userDao.createUser(account, hashedPassword, name, phone_number, type_id, region_id);
};

const login = async (account, password) => {
  const user = await userDao.getUserByAccount(account);
  if (!user) {
    throw new BaseError("이메일과 비밀번호를 확인해주세요.", 400);

  }
  const isPasswordCorrect = bcrypt.compareSync(password, user.password);

  if (!isPasswordCorrect) {
    throw new BaseError("이메일과 비밀번호를 확인해주세요.", 400);
  }
  // 토큰 완료시간 1시간으로 설정
  const accessToken = jwt.sign({ user_id: user.id, type_id: user.type_id }, SECRET_KEY, {
    expiresIn: "1h",
    issuer: ISSUER,
  });
  // 리프레시 토큰은 만료시간 14일
  const refreshToken = jwt.sign({}, SECRET_KEY, {
    expiresIn: "14d",
    issuer: ISSUER,
  });

  await userDao.createRefreshToken(refreshToken, user.id);

  const token = [accessToken, refreshToken];
  return token;
};

const checkUserExist = async (user_id) => {
  const user = await userDao.getUserByUserId(user_id);
  if (!user) {
    throw new BaseError("해당 유저는 존재하지 않습니다.", 404);
  }
};

const checkUserTypeId = async (user_type_id) => {
  if (user_type_id === 2) {
    throw new BaseError("지역 담당자는 정보 수정 권한이 없습니다.", 403);
  }
};

const updateName = async (user_id, name) => {
  validationName(name);
  const savedData = await userDao.getUserNameByIdAndName(user_id, name);
  if (!savedData) {
    await userDao.updateName(user_id, name);
  } else {
    throw new BaseError("기존 이름과 동일합니다.", 400);
  }
};

const updatePhone = async (user_id, phone) => {
  validationPhone(phone);
  const savedData = await userDao.getUserPhoneByIdAndPhone(user_id, phone);
  if (!savedData) {
    await userDao.updatePhone(user_id, phone);
  } else {
    throw new BaseError("기존 연락처와 동일합니다.", 400);
  }
};

const updateRegion = async (user_id, region_id) => {
  const region = await userDao.getRegionById(region_id);
  if (!region) {
    throw new BaseError("존재하지 않는 지역ID 입니다.", 404);
  }

  const savedData = await userDao.getUserRegionById(user_id, region_id);
  if (!savedData) {
    await userDao.updateRegion(user_id, region_id);
  } else {
    throw new BaseError("기존 지역ID와 동일합니다.", 404);
  }
};

module.exports = {
  signUp,
  login,
  checkUserExist,
  checkUserTypeId,
  updateName,
  updatePhone,
  updateRegion,
};
