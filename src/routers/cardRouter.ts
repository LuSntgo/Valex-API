import { Router } from "express";
import * as cardController from "../controllers/cardsController.js"

const cardRouter = Router()

cardRouter.post("/cards", cardController.postCard)

export default cardRouter;