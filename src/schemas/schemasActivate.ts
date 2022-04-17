import joi from "joi";

const activateSchema = joi.object({
  securityCode: joi.string(),
  password: joi.string().pattern(/\d{4}/)
})

export default activateSchema