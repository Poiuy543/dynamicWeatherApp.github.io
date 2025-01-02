const Joi = require("joi");

const saveMstReligionStatusDetailsSchema = Joi.object({
  religion_status_name: Joi.string().required(),
});

const updateMstReligionStatusDetailsSchema = Joi.object({
  religion_status_id: Joi.number().required(),
  religion_status_name: Joi.string().required(),
});

const deleteMstReligionStatusDetailsSchema = Joi.object({
  religion_status_id: Joi.number().required(),
});

module.exports = {
  saveMstReligionStatusDetailsSchema,
  updateMstReligionStatusDetailsSchema,
  deleteMstReligionStatusDetailsSchema,
};
