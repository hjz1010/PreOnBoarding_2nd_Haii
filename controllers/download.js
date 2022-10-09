const downloadService = require("../services/download");
const { BaseError } = require("../middlewares/appError");

//유저 정보만으로 추출
const download = async (req, res) => {
  const { userId, userTypeId } = req;
  if (userTypeId === 1) {
    await downloadService.fullDownload();
    res.redirect("/download.xlsx");
  } else if (userTypeId === 2) {
    await downloadService.regionDownload(userId);
    res.redirect("/download.xlsx");
  } else {
    throw new BaseError("유저 유형이 올바르지 않습니다.", 403);
  }
};

//쿼리문 있는 경우 (검색)
const filterDownload = async (req, res) => {
  const { userId, userTypeId } = req;
  const reqFilter = req.query;
  const isEmpty = JSON.stringify(reqFilter);
  if (isEmpty === "{}" || isEmpty === '{"type":"0"}') {
    res.redirect("/download");
  } else {
    filter = {
      type: "",
      name: "",
      rep: "",
      contact: "",
      doctor: 0,
      nurse: 0,
      social: 0,
    };

    for (key in reqFilter) {
      filter[key] = reqFilter[key];
    }

    switch (filter.type) {
      case "0":
        filter.type = "";
        break;
      case "1":
        filter.type = "광역치매센터";
        break;
      case "2":
        filter.type = "치매상담전화센터";
        break;
      case "3":
        filter.type = "치매안심센터";
        break;
    }

    if (userTypeId === 1) {
      await downloadService.filterFullDownload(filter);
      res.redirect("/download.xlsx");
    } else if (userTypeId === 2) {
      await downloadService.filterRegionDownload(userId, filter);
      res.redirect("/download.xlsx");
    } else {
      throw new BaseError("유저 유형이 올바르지 않습니다.", 403);
    }
  }
};

module.exports = {
  download,
  filterDownload,
};
