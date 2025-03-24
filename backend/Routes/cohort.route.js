const express = require("express");
const router = express.Router();
const {
  getAllCohort,
  createCohort,
  viewCohort,
  updateCohort,
  deleteCohort,
} = require("../controllers/Cohort.controllers");
const { verifyAccessToken } = require("../helpers/jwt_helper");

router.get("/:proId",verifyAccessToken, getAllCohort);
router.post("/",verifyAccessToken, createCohort);
router.get("/:proId/:cohortId",verifyAccessToken, viewCohort);
router.put("/:proId/:cohortId",verifyAccessToken, updateCohort);
router.delete("/:proId/:cohortId",verifyAccessToken, deleteCohort);
module.exports = router;