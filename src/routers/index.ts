import { Router } from "express";
import cardRouter from "./cardRouter.js";
import purchaseRouter from "./purchaseRouter.js";
import rechargeRouter from "./rechargeRouter.js";
const router = Router();

router.use(cardRouter)
router.use(rechargeRouter)
router.use(purchaseRouter)

export default router;