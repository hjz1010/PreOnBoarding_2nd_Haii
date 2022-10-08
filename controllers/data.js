const dataService = require("../services/data.js");
const dataFile = require("../data.json");

const inputData = async (req, res) => {
  const data = dataFile.records;

  for (i = 0; i < data.length; i++) {
    const name = dataFile.records[i].운영기관명;
    const representative = dataFile.records[i].운영기관대표자명;
    const contact = dataFile.records[i].운영기관전화번호;
    const consignment_date = dataFile.records[i].운영위탁일자;

    const inputOperatingData = await dataService.inputOperatingData(
      name,
      representative,
      contact,
      consignment_date,
    );
  }

  for (i = 0; i < data.length; i++) {
    const name = dataFile.records[i].관리기관명;
    const contact = dataFile.records[i].관리기관전화번호;

    const inputManagementData = await dataService.inputManagementData(
      name,
      contact,
    );
  }

  for (i = 0; i < data.length; i++) {
    const institution_code = dataFile.records[i].제공기관코드;
    const name = dataFile.records[i].제공기관명;

    const inputProviderData = await dataService.inputProviderData(
      institution_code,
      name,
    );
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
    const operating_institution_id = [i + 1];
    const management_institution_id = [i + 1];
    const provider_institution_id = [i + 1];

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
      operating_institution_id,
      management_institution_id,
      provider_institution_id,
    );
  }

  res.status(200).json({ message: "success" });
};

module.exports = {
  inputData,
};
