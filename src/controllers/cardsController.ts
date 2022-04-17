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
  }
}

export async function activateCard(req: Request, res: Response) {
  // const {id} = req.params
  // const {securityCode, password} = req.body
  // const idNumber : number = parseInt(id)
  // await cardService.activateCard(idNumber, securityCode, password)
  // res.sendStatus(201)
}

export async function getCardBalance(req: Request, res: Response) {
  // const {id} = req.params
  // const idNumber : number = parseInt(id)
  // res.send(await cardService.getBalance(idNumber))
}

export async function rechargeCard(req: Request, res: Response) {
  // const {id} = req.params
  // const {amount} = req.body
  // const idNumber : number = parseInt(id)
  // await cardService.recharge(idNumber, amount)
  // res.sendStatus(201)
}

export async function postPayment(req: Request, res: Response) {
  // const {id, idBusiness} = req.params
  // const {amount, password} = req.body
  // const idNumber : number = parseInt(id)
  // const idNumberBusiness : number = parseInt(idBusiness)
  // await cardService.payment(idNumber, password, idNumberBusiness, amount)
  // res.sendStatus(200)
}

export async function putBlockCard(req: Request, res: Response) {
  // const {id} = req.params
  // const {password} = req.body
  // const idNumber : number = parseInt(id)
  // await cardService.blockCard(idNumber, password)
  // res.sendStatus(200)
}
export async function putUnBlockCard(req: Request, res: Response) {
  // const {id} = req.params
  // const {password} = req.body
  // const idNumber : number = parseInt(id)
  // await cardService.unBlockCard(idNumber, password)
  // res.sendStatus(200)
}
