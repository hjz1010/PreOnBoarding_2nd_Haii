const express = require("express");
const fileMiddleware = require("../middlewares/file");
const downloadController = require("../controllers/download");
const errorHandler = require("../middlewares/errorHandler");

const router = express.Router();

router.get("", errorHandler(fileMiddleware.verifyToken), errorHandler(downloadController.download));
router.get("/search", errorHandler(fileMiddleware.verifyToken), errorHandler(downloadController.filterDownload));

/*
검색 조건
1. 치매센터유형 (공란 혹은 0: 전체 1: 광역치매센터, 2: 치매상담전화센터, 3: 치매안심센터)
 type=(1,2,3)

2. 치매센터명, 운영기관대표자명, 운영기관 전화번호 부분 검색 
  치매센터명: name
  운영기관대표자명: rep
  운영기관 전화번호: contact

3. 의사인원수, 간호사인원수, 사회복지사인원수: 일정 숫자 이상 검색
  의사인원수: doctor = (숫자)
  간호사인원수: nurse = (숫자)
  사회복지사인원수: social = (숫자)
*/

router.use((req, res, next) => {
  res.status(404).json("Not Found");
});

module.exports = router;
