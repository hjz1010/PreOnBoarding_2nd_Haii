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
module.exports = {
  createUser,
  existCheckUserByAccount,
  getUserByAccount,
  createRefreshToken,
};
