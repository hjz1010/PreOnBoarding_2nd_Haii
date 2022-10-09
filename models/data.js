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
  operating_institution_name,
  operating_institution_representative,
  operating_institution_contact,
  operating_institution_consignment_date,
  management_institution_name,
  management_institution_contact,
  provider_institution_code,
  provider_institution_name,
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
      VALUES 
        (?,?,?,?,?,?,?,?,?,?,?,?,?,?,
        (SELECT id FROM operating_institutions WHERE name LIKE ? AND representative LIKE ? AND contact LIKE ? AND consignment_date LIKE ?),
        (SELECT id FROM management_institutions WHERE name LIKE ? AND contact LIKE ?),
        (SELECT id FROM provider_institutions WHERE institution_code LIKE ? AND name LIKE ?)
        )
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
      operating_institution_name,
      operating_institution_representative,
      operating_institution_contact,
      operating_institution_consignment_date,
      management_institution_name,
      management_institution_contact,
      provider_institution_code,
      provider_institution_name,
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
