import { Request, Response } from "express";
import * as cardService from "../services/cardServices.js";

export async function postCard(req: Request, res: Response) {
  const { apiKey } = res.locals;
  const { employeeId, type } = req.body;

  try {
    await cardService.createCard(apiKey, employeeId, type);
    res.sendStatus(201);
  } catch (err) {
    if (err?.erro_type === "conflict_error") {
      return res.sendStatus(409);
    }
    console.log(err);
    res.sendStatus(500);
  }
}

export async function activateCard(req: Request, res: Response) {
  const { id } = req.params;
  const { securityCode, password } = req.body;
  const idNumber: number = parseInt(id);
  try {
    await cardService.activateCard(idNumber, securityCode, password);
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function getCardBalance(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const totalBalance = await cardService.getBalance(Number(id));
    res.send(totalBalance);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
