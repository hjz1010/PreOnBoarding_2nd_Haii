const { myDataSource } = require("./typeorm-client");
const { BaseError } = require("../middlewares/appError");

//유저 아이디로 유저 타입 가져오기
const getUserTypeByUserId = async (userId) => {
  const userType = JSON.parse(
    JSON.stringify(await myDataSource.query(`SELECT type_id FROM users WHERE id = ?`, [userId])),
  )[0].type_id;
  return userType;
};

//유저 아이디로 유저 지역 정보 가져오기
const getUserInfoByUserId = async (userId) => {
  const userInfo = JSON.parse(
    JSON.stringify(
      await myDataSource.query(
        `SELECT pi.name AS user_info FROM users AS u 
      LEFT JOIN provider_institutions AS pi ON u.region_id = pi.id WHERE u.id = ?`,
        [userId],
      ),
    ),
  )[0].user_info;
  return userInfo;
};

//유저 전체 정보 가져오기
const getUserData = async () => {
  const result = JSON.parse(JSON.stringify(await myDataSource.query(`SELECT * FROM user_data`)));
  return result;
};

//특정 지역 유저 가져오기
// const getFilteredUserData = async (userInfo) => {
//   const result = JSON.parse(
//     JSON.stringify(
//       await myDataSource.query(`SELECT * FROM user_data WHERE region = ? `, [
//         userInfo,
//       ]),
//     ),
//   );
//   return result;
// };

//센터 전체 정보 가져오기
const getFullCenterData = async () => {
  const result = JSON.parse(JSON.stringify(await myDataSource.query(`SELECT * FROM center_data`)));
  return result;
};

//특정 지역 센터 정보 가져오기
const getCenterDataByRegion = async (userInfo) => {
  const result = JSON.parse(
    JSON.stringify(await myDataSource.query(`SELECT * FROM center_data WHERE provider_name = ?`, [userInfo])),
  );
  return result;
};

//특정 지역의 검색된 센터 정보 가져오기  ---------수정필요
const getFilteredCenterData = async (userInfo) => {
  const result = JSON.parse(
    JSON.stringify(await myDataSource.query(`SELECT * FROM center_data WHERE provider_name = ?`, [userInfo])),
  );
  return result;
};

module.exports = {
  getUserTypeByUserId,
  getUserInfoByUserId,
  getUserData,
  //getFilteredUserData,
  getFullCenterData,
  getCenterDataByRegion,
  getFilteredCenterData,
};
