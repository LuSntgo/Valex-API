import { Router } from "express";
import * as cardController from "../controllers/cardsController.js";
import schemaCard from "../schemas/schemasCards.js";
import schemaActive from "../schemas/schemasActivate.js";
import { validateSchema } from "../middlewares/validateSchemaMiddleware.js";
import { validateApiKey } from "../middlewares/validateApiKeyMiddleware.js";

const cardRouter = Router();

cardRouter.post(
  "/cards",
  validateSchema(schemaCard),
  validateApiKey,
  cardController.postCard
);
cardRouter.put("/cards/:id/activate", validateSchema(schemaActive), validateApiKey, cardController.activateCard);

cardRouter.get("/cards/:id/balance", cardController.getCardBalance);

export default cardRouter;
