import { Router } from "express"
import { rechargeCard } from "../controllers/rechargeController.js";
import {validateSchema} from "../middlewares/validateSchemaMiddleware.js"
import rechargeSchema from "../schemas/schemasRecharge.js";

const rechargeRouter = Router();

rechargeRouter.post("/recharge/cards/:id", validateSchema(rechargeSchema), rechargeCard)

export default rechargeRouter;