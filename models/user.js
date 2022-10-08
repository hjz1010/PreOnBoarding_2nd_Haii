const { myDataSource } = require("./typeorm-client");

const getUserByAccount = async (account) => {
  const [ user ] = await myDataSource.query(`
    SELECT * 
    FROM users
    WHERE account = ?
  `,[account])

  return user;
};

const createRefreshToken = async (refreshToken, userId) => {
    await myDataSource.query(`
      UPDATE users 
      SET refresh_token = ?
      WHERE id = ?
    `,[refreshToken, userId])
    return;
};
module.exports = {
  getUserByAccount, createRefreshToken
};
