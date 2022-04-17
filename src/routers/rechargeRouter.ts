import { Router } from "express"
// import * as rechargeController from "../controllers/rechargeController.js";
import {validateSchema} from "../middlewares/validateSchemaMiddleware.js"
import rechargeSchema from "../schemas/schemasRecharge.js";

const rechargeRouter = Router();

rechargeRouter.post("/recharge/cards/:id", validateSchema(rechargeSchema))

export default rechargeRouter