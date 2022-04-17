import joi from "joi"

const rechargeSchema = joi.object({
  password: joi.number().min(1)
})

export default rechargeSchema