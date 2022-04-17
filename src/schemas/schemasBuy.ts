import joi from "joi"

const buySchema = joi.object({
  password: joi.string().pattern(/\d{4}/),
  amount: joi.number().min(1)
})

export default buySchema