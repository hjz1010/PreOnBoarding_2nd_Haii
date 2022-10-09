const dataService = require("../services/data.js");
const dataFile = require("../data.json");
const jwt = require("jsonwebtoken");

const inputData = async (req, res) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({ message: "유저 인증이 필요합니다." });
  } else {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "인증에 실패하였습니다." });
      } else {
        req.userId = decoded.user_id;
        req.userTypeId = decoded.type_id;
      }
    });
    if (!req.userId) {
      return res.status(400).json({ message: "유저가 존재하지 않습니다." });
    }
  }

  const type_id = req.userTypeId;

  if (type_id !== 1) {
    res.status(403).json({ message: "데이터 접근 권한이 없습니다." });
    return;
  }

  const data = dataFile.records;
  let operatingData = [];
  let managementData = [];
  let providerData = [];

  /** 운영기관 부분 데이터 */
  for (i = 0; i < data.length; i++) {
    operatingData.push({
      운영기관명: data[i].운영기관명,
      운영기관대표자명: data[i].운영기관대표자명,
      운영기관전화번호: data[i].운영기관전화번호,
      운영위탁일자: data[i].운영위탁일자,
    });
  }
  operatingData = [...new Set(operatingData.map(JSON.stringify))].map(JSON.parse);

  for (i = 0; i < operatingData.length; i++) {
    const name = operatingData[i].운영기관명;
    const representative = operatingData[i].운영기관대표자명;
    const contact = operatingData[i].운영기관전화번호;
    const consignment_date = operatingData[i].운영위탁일자;

    const inputOperatingData = await dataService.inputOperatingData(name, representative, contact, consignment_date);
  }

  /** 관리기관부분 데이터 */
  for (i = 0; i < data.length; i++) {
    managementData.push({
      관리기관명: data[i].관리기관명,
      관리기관전화번호: data[i].관리기관전화번호,
    });
  }
  managementData = [...new Set(managementData.map(JSON.stringify))].map(JSON.parse);

  for (i = 0; i < managementData.length; i++) {
    const name = managementData[i].관리기관명;
    const contact = managementData[i].관리기관전화번호;

    const inputManagementData = await dataService.inputManagementData(name, contact);
  }
  /** 제공기관부분 데이터 */
  for (i = 0; i < data.length; i++) {
    providerData.push({
      제공기관코드: data[i].제공기관코드,
      제공기관명: data[i].제공기관명,
    });
  }
  providerData = [...new Set(providerData.map(JSON.stringify))].map(JSON.parse);

  for (i = 0; i < providerData.length; i++) {
    const institution_code = providerData[i].제공기관코드;
    const name = providerData[i].제공기관명;

    const inputProviderData = await dataService.inputProviderData(institution_code, name);
  }

  for (i = 0; i < data.length; i++) {
    const name = dataFile.records[i].치매센터명;
    const type = dataFile.records[i].치매센터유형;
    const road_address = dataFile.records[i].소재지도로명주소;
    const lot_address = dataFile.records[i].소재지지번주소;
    const lat = dataFile.records[i].위도;
    const lng = dataFile.records[i].경도;
    const found_date = dataFile.records[i].설립연월;
    const building_area = dataFile.records[i].건축물면적;
    const amenities = dataFile.records[i].부대시설정보;
    const doctor_count = dataFile.records[i].의사인원수;
    const nurse_count = dataFile.records[i].간호사인원수;
    const social_worker_count = dataFile.records[i].사회복지사인원수;
    const others_count = dataFile.records[i].기타인원현황;
    const program = dataFile.records[i].주요치매관리프로그램소개;
    const operating_institution_name = dataFile.records[i].운영기관명;
    const operating_institution_representative = dataFile.records[i].운영기관대표자명;
    const operating_institution_contact = dataFile.records[i].운영기관전화번호;
    const operating_institution_consignment_date = dataFile.records[i].운영위탁일자;
    const management_institution_name = dataFile.records[i].관리기관명;
    const management_institution_contact = dataFile.records[i].관리기관전화번호;
    const provider_institution_code = dataFile.records[i].제공기관코드;
    const provider_institution_name = dataFile.records[i].제공기관명;

    const inputData = await dataService.inputCenterData(
      name,
      type,
      road_address,
      lot_address,
      lat,
      lng,
      found_date,
      building_area,
      amenities,
      doctor_count,
      nurse_count,
      social_worker_count,
      others_count,
      program,
      operating_institution_name,
      operating_institution_representative,
      operating_institution_contact,
      operating_institution_consignment_date,
      management_institution_name,
      management_institution_contact,
      provider_institution_code,
      provider_institution_name,
    );
  }

  res.status(200).json({ message: "데이터 입력 성공!" });
};

module.exports = {
  inputData,
};
