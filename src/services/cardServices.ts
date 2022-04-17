import dayjs from "dayjs";
import bcrypt from "bcrypt";
import { Card } from "../repositories/cardRepository.js";
import * as companyService from "./companyService.js";
import * as cardRepository from "../repositories/cardRepository.js";
import * as employeeRepository from "../repositories/employeeRepository.js";
import * as paymentRepository from "../repositories/paymentRepository.js";
import * as recahargeRepository from "../repositories/rechargeRepository.js";
import * as cardUtils from "../utils/cardUtils.js";

export async function createCard(
  apiKey: string,
  employeeId: number,
  type: cardRepository.TransactionTypes
) {
  //   await companyService.companyCheck(apiKey);

  const employee = await employeeRepository.findById(employeeId);
  if (!employee) {
    throw { type: "not_found", message: "Employee not exist" };
  }
  const existingCard = await cardUtils.verifyCardType(employeeId, type);
  if (existingCard) {
    throw {
      erro_type: "conflict_error",
      message: "Card type already in use",
    };
  }

  const cardName = await cardUtils.formatCardName(employee.fullName);

  const card = await cardUtils.formatCreditCard(employee.id, cardName, type);
  await cardRepository.insert(card);
}
