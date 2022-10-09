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
      SELECT * FROM (SELECT ? as name, ? as type, ? as road_address, ? as lot_address, ? as lat, ? as lng, ? as found_date,
        ? as building_are, ? as amenities, ? as doctor_count, ? as nurse_count, ? as social_worker_count, ? as others_count, ? as program,
        (SELECT id FROM operating_institutions WHERE name LIKE ? AND representative LIKE ? AND contact LIKE ? AND consignment_date LIKE ?) as operating_institution_id,
        (SELECT id FROM management_institutions WHERE name LIKE ? AND contact LIKE ?) as management_institution_id,
        (SELECT id FROM provider_institutions WHERE institution_code LIKE ? AND name LIKE ?) as provider_institution_id) AS tmp
    WHERE NOT EXISTS
      (SELECT name FROM centers
        WHERE name = ? AND type = ? AND road_address = ? AND lot_address = ? AND lat = ? AND lng = ? AND found_date = ? AND building_area = ?
        AND amenities = ? AND doctor_count = ? AND nurse_count = ? AND social_worker_count = ? AND others_count = ? AND program = ?)
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
    ],
  );
  return inputData;
};

const inputOperatingData = async (name, representative, contact, consignment_date) => {
  const inputOperatingData = await myDataSource.query(
    `
    INSERT INTO operating_institutions (name, representative, contact, consignment_date)
    SELECT * FROM (SELECT ? as name, ? as representative, ? as contact, ? as consignment_date) AS tmp
    WHERE NOT EXISTS
      (SELECT name, representative, contact, consignment_date FROM operating_institutions
        WHERE name = ? AND representative = ? AND contact = ? AND consignment_date = ?)
    `,
    [name, representative, contact, consignment_date, name, representative, contact, consignment_date],
  );
  return inputOperatingData;
};

const inputManagementData = async (name, contact) => {
  const inputManagementData = await myDataSource.query(
    `
    INSERT INTO management_institutions (name, contact)
    SELECT * FROM (SELECT ? as name, ? as contact) AS tmp
    WHERE NOT EXISTS
      (SELECT name, contact FROM management_institutions
        WHERE name = ? AND contact = ?)
    `,
    [name, contact, name, contact],
  );
  return inputManagementData;
};

const inputProviderData = async (institution_code, name) => {
  const inputProviderData = await myDataSource.query(
    `
    INSERT INTO provider_institutions (institution_code, name)
      SELECT * FROM (SELECT ? as institution_code, ? as name) AS tmp
    WHERE NOT EXISTS
      (SELECT institution_code, name FROM provider_institutions
        WHERE institution_code = ? AND name = ?)
    `,
    [institution_code, name, institution_code, name],
  );
  return inputProviderData;
};

module.exports = {
  inputCenterData,
  inputOperatingData,
  inputManagementData,
  inputProviderData,
};
