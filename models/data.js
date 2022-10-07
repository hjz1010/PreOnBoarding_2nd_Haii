const { myDataSource } = require("./typeorm-client");

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
  operating_institution_id,
  management_institution_id,
  provider_institution_id,
) => {
  const inputData = await myDataSource.query(
    `
    INSERT INTO centers (
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
      provider_institution_id
      ) 
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
    `,
    [
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
    ],
  );
  return inputData;
};

const inputOperatingData = async (
  name,
  representative,
  contact,
  consignment_date,
) => {
  const inputOperatingData = await myDataSource.query(
    `
    INSERT INTO operating_institutions (name, representative, contact, consignment_date)
    VALUES (?, ?, ?, ?)
    `,
    [name, representative, contact, consignment_date],
  );
  return inputOperatingData;
};

const inputManagementData = async (name, contact) => {
  const inputManagementData = await myDataSource.query(
    `
    INSERT INTO management_institutions (name, contact)
    VALUES (?, ?)
    `,
    [name, contact],
  );
  return inputManagementData;
};

const inputProviderData = async (institution_code, name) => {
  const inputProviderData = await myDataSource.query(
    `
    INSERT INTO provider_institutions (institution_code,
      name)
    VALUES (?, ?)
    `,
    [institution_code, name],
  );
  return inputProviderData;
};

module.exports = {
  inputCenterData,
  inputOperatingData,
  inputManagementData,
  inputProviderData,
};
