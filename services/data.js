const { json } = require("express");
const dataDao = require("../models/data.js");

const inputCenterData = async (
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
) => {
  const inputData = await dataDao.inputCenterData(
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
  return inputData;
};

const inputOperatingData = async (
  name,
  representative,
  contact,
  consignment_date,
) => {
  const inputOperatingData = await dataDao.inputOperatingData(
    name,
    representative,
    contact,
    consignment_date,
  );
  return inputOperatingData;
};

const inputManagementData = async (name, contact) => {
  const inputManagementData = await dataDao.inputManagementData(name, contact);
  return inputManagementData;
};

const inputProviderData = async (institution_code, name) => {
  const inputProviderData = await dataDao.inputProviderData(
    institution_code,
    name,
  );
  return inputProviderData;
};

module.exports = {
  inputCenterData,
  inputOperatingData,
  inputManagementData,
  inputProviderData,
};
