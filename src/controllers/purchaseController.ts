import { Request, Response } from "express";
import * as cardService from "../services/cardServices.js";

export async function purchaseCard(req: Request, res: Response) {
  const { cardId, businessId } = req.params;
  const { password, amount } = req.body;

  await cardService.purchaseCard(
    parseInt(cardId),
    parseInt(businessId),
    password,
    amount
  );

  res.sendStatus(200);
}
