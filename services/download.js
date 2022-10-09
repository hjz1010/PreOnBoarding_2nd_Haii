const downloadDao = require("../models/download");
const Excel = require("exceljs");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const { BaseError } = require("../middlewares/appError");

const getUserType = async (userId) => {
  const userType = await downloadDao.getUserTypeByUserId(userId);
  if (!userType) {
    throw new BaseError("유저 유형이 없습니다.", 403);
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

//전체 - 검색된 데이터 (대표 관리자)
const filterFullDownload = async (filter) => {
  let data = {};
  data.users = await downloadDao.getUserData();
  data.centers = await downloadDao.getFilteredFullCenterData(filter);
  await jsonToExcel(data);
  return;
};

// 담당지역 데이터 (지역담당자)
const regionDownload = async (userId) => {
  const userInfo = await downloadDao.getUserInfoByUserId(userId);
  let data = {};
  data.centers = await downloadDao.getCenterDataByRegion(userInfo);
  await jsonToExcel(data);
  return;
};

// 담당지역-검색된 데이터 (지역담당자)
const filterRegionDownload = async (userId, filter) => {
  const userInfo = await downloadDao.getUserInfoByUserId(userId);
  let data = {};
  data.centers = await downloadDao.getFilteredCenterData(userInfo, filter);
  await jsonToExcel(data);
  return;
};

//데이터 엑셀 파일로 변환
const jsonToExcel = async (data) => {
  if (!data.centers[0]) {
    throw new BaseError("검색 결과가 없습니다.", 200);
  }

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
      const headerEachCell = workSheet.getCell(`${String.fromCharCode(i + 64)}1`);
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
    { header: "치매센터명", key: "name", width: 30 },
    { header: "치매센터유형", key: "type", width: 16 },
    { header: "소재지도로명주소", key: "road_address", width: 36 },
    { header: "소재지지번주소", key: "lot_address", width: 36 },
    { header: "위도", key: "lat", width: 14 },
    { header: "경도", key: "lng", width: 14 },
    { header: "설립연월", key: "found_date", width: 10 },
    { header: "건축물면적", key: "building_area", width: 10 },
    { header: "부대시설정보", key: "amenities", width: 24 },
    { header: "의사인원수", key: "doctor_count", width: 10 },
    { header: "간호사인원수", key: "nurse_count", width: 12 },
    { header: "사회복지사인원수", key: "social_worker_count", width: 14 },
    { header: "기타인원현황", key: "others_count", width: 24 },
    { header: "주요치매관리프로그램소개", key: "program", width: 70 },
    { header: "운영기관명", key: "operater_name", width: 26 },
    { header: "운영기관대표자명", key: "operater_representative", width: 18 },
    { header: "운영기관전화번호", key: "operater_contact", width: 16 },
    { header: "운영위탁일자", key: "operating_consignment_date", width: 12 },
    { header: "관리기관명", key: "management_name", width: 20 },
    { header: "관리기관전화번호", key: "management_contact", width: 16 },
    { header: "제공기관코드", key: "provider_code", width: 12 },
    { header: "제공기관명", key: "provider_name", width: 18 },
  ];
  centerSheet.addRows(data.centers);
  setHeader("centers");
  addTitle("centers", "전국 치매 센터 목록");

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
      { header: "아이디", key: "account", width: 16 },
      { header: "이름", key: "name", width: 8 },
      { header: "연락처", key: "contact", width: 14 },
      { header: "직급", key: "type", width: 14 },
      { header: "담당지역", key: "region", width: 18 },
      { header: "담당지역코드", key: "region_code", width: 12 },
      { header: "갱신일", key: "updated_at", width: 18 },
      { header: "생성일", key: "created_at", width: 18 },
    ];
    userSheet.addRows(data.users);
    setHeader("users");
    addTitle("users", "전국 치매 센터 관리자 명단");
  }

  //파일 생성
  await workbook.xlsx.writeFile("./public/download.xlsx").then();
  return;
};

module.exports = {
  getUserType,
  fullDownload,
  filterFullDownload,
  regionDownload,
  filterRegionDownload,
};
