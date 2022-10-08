const downloadDao = require("../models/download");
const Excel = require("exceljs");
const jwt = require("jsonwebtoken");
const fs = require("fs");

const getUserId = async (token) => {
  let userId;
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      let error = new Error("Error: 인증에 실패하였습니다.");
      error.code = 403;
      throw error;
    } else {
      userId = decoded.userId;
    }
  });
  if (!userId) {
    let error = new Error("Error: 유저 아이디가 없습니다.");
    error.code = 403;
    throw error;
  }
  return userId;
};

const getUserType = async (userId) => {
  const userType = await downloadDao.getUserTypeByUserId(userId);
  if (!userType) {
    let error = new Error("Error: 유저 유형이 없습니다.");
    error.code = 403;
    throw error;
  }
  return userType;
};

//전체 데이터 (대표 관리자)
const fullDownload = async () => {
  let data = {};
  data.users = await downloadDao.getUserData();
  data.centers = await downloadDao.getFullCenterData();
  await jsonToExcel(data);
  return;
};

// 검색 후 데이터 (지역담당자)
const filterDownload = async (userId) => {
  const userInfo = await downloadDao.getUserInfoByUserId(userId);
  let data = {};
  //data.users = await downloadDao.getFilteredUserData(userInfo);
  data.centers = await downloadDao.getFilteredCenterData(userInfo);
  await jsonToExcel(data);
  return;
};

//데이터 엑셀 파일로 변환
const jsonToExcel = async (data) => {
  //엑셀파일 생성
  const workbook = new Excel.Workbook();

  //시트 설정
  workbook.creator = "pre-onboarding back team2";
  workbook.lastModifiedBy = "pre-onboarding back team2";
  workbook.created = new Date();
  workbook.modified = new Date();

  //헤더 설정
  const setHeader = async (sheetName) => {
    const workSheet = workbook.getWorksheet(sheetName);
    for (let i = 1; i <= workSheet.columnCount; i++) {
      const headerEachCell = workSheet.getCell(
        `${String.fromCharCode(i + 64)}1`,
      );
      headerEachCell.alignment = { horizontal: "center" };
      headerEachCell.font = { bold: true };
    }
  };

  //시트별 타이틀 생성
  const addTitle = async (sheetName, titleValue) => {
    const workSheet = workbook.getWorksheet(sheetName);
    workSheet.spliceRows(1, 0, [], []);
    workSheet.getCell("A1").value = titleValue;
    workSheet.getCell("A1").alignment = { horizontal: "left" };
    workSheet.getCell("A1").font = { size: 14, bold: true };
  };

  //유저 시트 생성
  if (data.users) {
    const userSheet = workbook.addWorksheet("users", {
      views: [{ state: "frozen", xSplit: 1, ySplit: 1 }],
    });

    userSheet.columns = [
      {
        header: "No.",
        key: "id",
        width: 4,
        style: { alignment: { horizontal: "center" } },
      },
      { header: "account", key: "account", width: 16 },
      { header: "name", key: "name", width: 8 },
      { header: "contact", key: "contact", width: 14 },
      { header: "type", key: "type", width: 14 },
      { header: "region", key: "region", width: 18 },
      { header: "region_code", key: "region_code", width: 12 },
      { header: "updated_at", key: "updated_at", width: 18 },
      { header: "created_at", key: "created_at", width: 18 },
    ];
    userSheet.addRows(data.users);
    setHeader("users");
    addTitle("users", "전국 치매 센터 관리자 명단");
  }

  //센터 시트 생성
  const centerSheet = workbook.addWorksheet("centers", {
    views: [{ state: "frozen", xSplit: 1, ySplit: 1 }],
  });

  centerSheet.columns = [
    {
      header: "No.",
      key: "id",
      width: 4,
      style: { alignment: { horizontal: "center" } },
    },
    { header: "name", key: "name", width: 30 },
    { header: "type", key: "type", width: 16 },
    { header: "road_address", key: "road_address", width: 36 },
    { header: "lot_address", key: "lot_address", width: 36 },
    { header: "lat", key: "lat", width: 14 },
    { header: "lng", key: "lng", width: 14 },
    { header: "found_date", key: "found_date", width: 10 },
    { header: "building_area", key: "building_area", width: 10 },
    { header: "amenities", key: "amenities", width: 24 },
    { header: "doctor_count", key: "doctor_count", width: 10 },
    { header: "nurse_count", key: "nurse_count", width: 12 },
    { header: "social_worker_count", key: "social_worker_count", width: 14 },
    { header: "others_count", key: "others_count", width: 24 },
    { header: "program", key: "program", width: 70 },
    { header: "operater_name", key: "operater_name", width: 26 },
    {
      header: "operater_representative",
      key: "operater_representative",
      width: 18,
    },
    { header: "operater_contact", key: "operater_contact", width: 16 },
    {
      header: "operating_consignment_date",
      key: "operating_consignment_date",
      width: 12,
    },
    { header: "management_name", key: "management_name", width: 20 },
    { header: "management_contact", key: "management_contact", width: 16 },
    { header: "provider_code", key: "provider_code", width: 12 },
    { header: "provider_name", key: "provider_name", width: 18 },
    { header: "updated_at", key: "updated_at", width: 18 },
    { header: "created_at", key: "created_at", width: 18 },
  ];
  centerSheet.addRows(data.centers);
  setHeader("centers");
  addTitle("centers", "전국 치매 센터 목록");

  //파일 생성
  await workbook.xlsx.writeFile("./public/download.xlsx").then();
  return;
};

module.exports = {
  getUserId,
  getUserType,
  fullDownload,
  filterDownload,
};
