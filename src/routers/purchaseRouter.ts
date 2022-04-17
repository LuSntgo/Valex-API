import {Router} from "express"
import {validateSchema} from "../middlewares/validateSchemaMiddleware.js"
import schemasBuy from "../schemas/schemasBuy.js"
import * as purchaseController from "../controllers/purchaseController.js"

const purchaseRouter = Router()

purchaseRouter.post("/purchase/cards/:cardId/businesses/:businessId", validateSchema(schemasBuy), purchaseController.purchaseCard)

export default purchaseRouter