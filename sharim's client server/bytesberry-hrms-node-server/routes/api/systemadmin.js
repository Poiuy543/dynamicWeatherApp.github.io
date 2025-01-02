const express = require("express");
const router = express.Router();

const mstGenderController = require("../../controllers/system-admin/mstGenderController");
const mstReligionStatusController = require("../../controllers/system-admin/mstReligionStatusController");


// Master Gender

router
  .route("/masterGenderConfig")
  .get(mstGenderController.getMstGenderList)
  .post(mstGenderController.saveMstGenderDetails);

router
  .route("/masterGenderConfig/update")
  .post(mstGenderController.updateMstGenderDetails);

router
  .route("/masterGenderConfig/delete")
  .post(mstGenderController.deleteMstGenderDetails);


//  Master Religion_Status

router
  .route("/masterReligionStatusConfig")
  .get(mstReligionStatusController.getMstReligionStatusList)
  .post(mstReligionStatusController.saveMstReligionStatusDetails);

router
  .route("/masterReligionStatusConfig/update")
  .post(mstReligionStatusController.updateMstReligionStatusDetails);

router
  .route("/masterReligionStatusConfig/delete")
  .post(mstReligionStatusController.deleteMstReligionStatusDetails);


module.exports = router;
