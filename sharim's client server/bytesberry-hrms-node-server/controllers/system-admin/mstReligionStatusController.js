const pool = require("../../dbConfig"); // Adjust the import according to your project structure

const {
  saveMstReligionStatusDetailsSchema,
  updateMstReligionStatusDetailsSchema,
  deleteMstReligionStatusDetailsSchema,
} = require("../../schemas/system-admin/mstReligionStatusSchema"); // Ensure you have the corresponding validation schemas

const getMstReligionStatusList = async (req, res, next) => {
  try {
    const mstReligionStatusList = await pool.query(
      "SELECT * FROM get_mst_religion_list() AS mst_religion_status_list;"
    );
    
    res.status(200).json({
      mstReligionStatusList:
        mstReligionStatusList.rowCount > 0 ? mstReligionStatusList.rows[0].mst_religion_status_list : [],
      status: 200,
      errMsg: "",
    });
  } catch (error) {
    console.log("getMstReligionStatusList", error);
    res.status(500).json({
      status: 500,
      errMsg: "Server Error",
    });
  }
};

const saveMstReligionStatusDetails = async (req, res, next) => {
  try {
    const schemaValidation = await saveMstReligionStatusDetailsSchema.validateAsync(req.body);
    
    const { religion_status_name } = schemaValidation;

    const saveMstReligionStatusDetails = await pool.query(
      "SELECT * FROM add_mst_religion_details($1)",
      [religion_status_name]
    );

    if (saveMstReligionStatusDetails.rows[0].add_mst_religion_details === "true") {
      res.status(200).json({
        saveMstReligionStatusDetails:
          saveMstReligionStatusDetails.rows[0].add_mst_religion_details,
        status: 200,
        errMsg: "",
      });
    } else {
      res.status(202).json({
        saveMstReligionStatusDetails:
          saveMstReligionStatusDetails.rows[0].add_mst_religion_details,
        status: 202,
        errMsg: "",
      });
    }
  } catch (error) {
    console.log(error);
    if (error.isJoi === true) {
      error.status = 422;
      res.status(422).json({
        saveMstReligionStatusDetails: {},
        status: 422,
        errMsg: error.message,
      });
    } else {
      res.status(500).json({
        saveMstReligionStatusDetails: {},
        status: 500,
        errMsg: error.message,
      });
    }
  }
};

const updateMstReligionStatusDetails = async (req, res, next) => {
  try {
    const schemaValidation = await updateMstReligionStatusDetailsSchema.validateAsync(req.body);

    const { religion_status_name, religion_status_id } = schemaValidation;

    const updateMstReligionStatusDetails = await pool.query(
      "SELECT * FROM update_mst_religion_details($1, $2)",
      [religion_status_name, religion_status_id]
    );

    if (updateMstReligionStatusDetails.rows[0].update_mst_religion_details === "true") {
      res.status(200).json({
        updateMstReligionStatusDetails:
          updateMstReligionStatusDetails.rows[0].update_mst_religion_details,
        status: 200,
        errMsg: "",
      });
    } else {
      res.status(202).json({
        updateMstReligionStatusDetails:
          updateMstReligionStatusDetails.rows[0].update_mst_religion_details,
        status: 202,
        errMsg: "",
      });
    }
  } catch (error) {
    console.log(error);
    if (error.isJoi === true) {
      error.status = 422;
      res.status(422).json({
        updateMstReligionStatusDetails: {},
        status: 422,
        errMsg: error.message,
      });
    } else {
      res.status(500).json({
        updateMstReligionStatusDetails: {},
        status: 500,
        errMsg: error.message,
      });
    }
  }
};

const deleteMstReligionStatusDetails = async (req, res) => {
  try {
    const schemaValidation = await deleteMstReligionStatusDetailsSchema.validateAsync(req.body);

    const deleteMstReligionStatusDetails = await pool.query(
      "SELECT * FROM delete_mst_religion_details($1)",
      [schemaValidation.religion_id]
    );

    res.json(deleteMstReligionStatusDetails.rows[0].religion_id);
  } catch (error) {
    console.log("Delete Marital Status Details Error", error);
    res.status(500).json({
      status: 500,
      errMsg: "Server Error",
    });
  }
};

module.exports = {
  getMstReligionStatusList,
  saveMstReligionStatusDetails,
  updateMstReligionStatusDetails,
  deleteMstReligionStatusDetails,
};
