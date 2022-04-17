import Joi from "joi";

const schemaCard = Joi.object({
  employeeId: Joi.number().required(),
  type: Joi.string().allow("groceries", "restaurants", "transport", "education", "health").required(),
});

export default schemaCard;