const downloadService = require("../services/download");
const { BaseError } = require("../middlewares/appError");

const download = async (req, res) => {
  try {
    const userId = req.userId;
    const userType = await downloadService.getUserType(userId);
    if (userType === 1) {
      await downloadService.fullDownload();
      res.redirect("/download.xlsx");
    } else if (userType === 2) {
      await downloadService.regionDownload(userId);
      res.redirect("/download.xlsx");
    } else {
      throw new BaseError("유저 유형이 올바르지 않습니다.", 403);
    }
  } catch (err) {
    console.log(err);
    res.status(err.code || 500).json({ message: err.message });
  }
};

module.exports = {
  download,
};
