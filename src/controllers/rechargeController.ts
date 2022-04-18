import { Request, Response } from "express";
import * as cardService from "../services/cardServices.js";

export async function rechargeCard(req: Request, res: Response) {
  const { id } = req.params;
  const { amount } = req.body;
  const apiKey = req.headers["x-api-key"].toString();
  try {
    const idNumber: number = parseInt(id);
    await cardService.rechargeCard(idNumber, amount, apiKey);
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    console.log("alo");
    res.sendStatus(500);
  }
}
