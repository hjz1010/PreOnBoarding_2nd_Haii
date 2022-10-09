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

//센터 전체 정보 가져오기
const getFullCenterData = async () => {
  const result = JSON.parse(JSON.stringify(await myDataSource.query(`SELECT * FROM center_data`)));
  return result;
};

//필터 쿼리문으로 변환
const filterToQuery = async (filter) => {
  let filterArr = [];
  console.log(filter.type);
  if (filter.type) {
    filterArr.push(`type = \'${filter.type}\'`);
  }
  if (filter.name) {
    filterArr.push(`name LIKE \'%${filter.name}%\'`);
  }
  if (filter.rep) {
    filterArr.push(`operater_representative LIKE \'%${filter.rep}%\'`);
  }
  if (filter.contact) {
    filterArr.push(`operater_contact LIKE \'%${filter.contact}%\'`);
  }
  if (filter.doctor && filter.doctor != 0) {
    filterArr.push(`doctor_count >= ${filter.doctor}`);
  }
  if (filter.nurse && filter.nurse != 0) {
    filterArr.push(`nurse_count >= ${filter.nurse}`);
  }
  if (filter.social && filter.social != 0) {
    filterArr.push(`social_worker_count >= ${filter.social}`);
  }
  const result = filterArr.join(" AND ");
  return result;
};

//센터 전체 검색된 정보 가져오기
const getFilteredFullCenterData = async (filter) => {
  const filterQuery = await filterToQuery(filter);
  let sql = "SELECT * FROM center_data WHERE ";
  const result = JSON.parse(JSON.stringify(await myDataSource.query(sql.concat(filterQuery))));
  return result;
};

//특정 지역 센터 정보 가져오기
const getCenterDataByRegion = async (userInfo) => {
  const result = JSON.parse(
    JSON.stringify(await myDataSource.query(`SELECT * FROM center_data WHERE provider_name = ?`, [userInfo])),
  );
  return result;
};

//특정 지역의 검색된 센터 정보 가져오기
const getFilteredCenterData = async (userInfo, filter) => {
  const filterQuery = await filterToQuery(filter);
  let sql = "SELECT * FROM (SELECT * FROM center_data WHERE provider_name = ?) AS data WHERE ";
  const result = JSON.parse(JSON.stringify(await myDataSource.query(sql.concat(filterQuery), [userInfo])));
  return result;
};

module.exports = {
  getUserTypeByUserId,
  getUserInfoByUserId,
  getUserData,
  getFullCenterData,
  getFilteredFullCenterData,
  getCenterDataByRegion,
  getFilteredCenterData,
};
