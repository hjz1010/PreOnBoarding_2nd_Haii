const { myDataSource } = require("./typeorm-client");

const createUser = async (account, hashedPassword, name, phone_number, type_id, region_id) => {
  try {
    await myDataSource.query(
      `
    INSERT INTO
    users
    (account, password, name, phone_number, type_id, region_id)
    VALUES (?,?,?,?,?,?)
    `,
      [account, hashedPassword, name, phone_number, type_id, region_id],
    );
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = "500";
    throw error;
  }
};

const existCheckUserByAccount = async (account) => {
  try {
    const user = await myDataSource.query(
      `
    SELECT exists(
      SELECT * 
      FROM users
      WHERE account = ?) 
    AS isExists
  `,
      [account],
    );
    return +user[0].isExists;
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = "500";
    throw error;
  }
};

const getUserByAccount = async (account) => {
  const [user] = await myDataSource.query(
    `
    SELECT * 
    FROM users
    WHERE account = ?
  `,
    [account],
  );
  return user;
};

const createRefreshToken = async (refreshToken, userId) => {
  await myDataSource.query(
    `
      UPDATE users 
      SET refresh_token = ?
      WHERE id = ?
    `,
    [refreshToken, userId],
  );
  return;
};

const getUserByUserId = async (id) => {
  const [user] = await myDataSource.query(
    `SELECT id FROM users WHERE id = ?`,
    [id]
  );
  return user
};

const getUserNameByIdAndName = async (id, name) => {
  const [user] = await myDataSource.query(
    `SELECT name FROM users WHERE id = ? AND name = ?`,
    [id, name]
  );
  return user
}

const getUserPhoneByIdAndPhone = async (id, phone) => {
  const [user] = await myDataSource.query(
    `SELECT name FROM users WHERE id = ? AND phone_number = ?`,
    [id, phone]
  );
  return user  
}

const getRegionById = async (region_id) => {
  const [region] = await myDataSource.query(
    `SELECT id FROM provider_institutions WHERE id = ?`,
    [region_id]
  );
  return region  
}

const getUserRegionById = async (user_id, region_id) => {
  const [region] = await myDataSource.query(
    `SELECT id FROM users WHERE id = ? AND region_id = ?`,
    [user_id, region_id]
  );
  return region  
}

const updateName = async (id, name) => {
  await myDataSource.query(
    `UPDATE users SET name = ? WHERE id = ?`,
    [name, id]
  )
}

const updatePhone = async (id, phone) => {
  await myDataSource.query(
    `UPDATE users SET phone_number = ? WHERE id = ?`,
    [phone, id]
  )
}

const updateRegion = async (user_id, region_id) => {
  await myDataSource.query(
    `UPDATE users SET region_id = ? WHERE id = ?`,
    [region_id, user_id]
  )
}

module.exports = {
  createUser,
  existCheckUserByAccount,
  getUserByAccount,
  createRefreshToken,
  getUserByUserId,
  getUserNameByIdAndName,
  getUserPhoneByIdAndPhone,
  getRegionById,
  getUserRegionById,
  updateName,
  updatePhone,
  updateRegion,
};