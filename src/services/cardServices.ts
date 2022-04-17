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
  await companyService.companyCheck(apiKey);

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

export async function activateCard(
  cardId: number,
  securityCode: string,
  password: string
) {
  const card = await registeredCard(cardId);

  if (card.password) {
    throw {
      type: "error_conflict",
      message: "Card has already been activated ",
    };
  }

  expirationDate(card.expirationDate);
  if (!bcrypt.compareSync(securityCode, card.securityCode)) {
    throw { type: "forbidden", message: "Security code don't match" };
  }

  const hashPassword = bcrypt.hashSync(password, 10);

  await cardRepository.update(cardId, {
    password: hashPassword,
    isBlocked: false,
  });
}

export async function registeredCard(cardId: number) {
  const card = await cardRepository.findById(cardId);
  if (!card) {
    throw { type: "not_found", message: "Card not exist" };
  }
  return card;
}

export function expirationDate(cardDate: string) {
  const expirationDate = dayjs(cardDate);
  const today = dayjs(Date.now());

  if (expirationDate.diff(today, "month") > 0) {
    throw { type: "forbidden", message: "Card expired" };
  }
}
