import dayjs from "dayjs";
import bcrypt from "bcrypt";

import * as companyService from "./companyService.js";
import * as cardRepository from "../repositories/cardRepository.js";
import * as employeeRepository from "../repositories/employeeRepository.js";
import * as paymentRepository from "../repositories/paymentRepository.js";
import * as rechargeRepository from "../repositories/rechargeRepository.js";
import * as businessRepository from "../repositories/businessRepository.js";
import * as cardUtils from "../utils/cardUtils.js";

export async function createCard(
  apiKey: string,
  employeeId: number,
  type: cardRepository.TransactionTypes
) {
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
  // console.log(card);
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

export async function getBalance(cardId: number) {
  try {
    await registeredCard(cardId);

    const transactions = await paymentRepository.findByCardId(cardId);
    const recharges = await rechargeRepository.findByCardId(cardId);

    const totalTransactions: number = calculateTotal(transactions);
    const totalRecharges: number = calculateTotal(recharges);
    // console.log(transactions);
    // console.log(recharges);
    return {
      balance: totalRecharges - totalTransactions,
      transactions,
      recharges,
    };
  } catch (err) {
    console.log(err);
  }
}

export function calculateTotal(list: any) {
  let totalAmount: number = list.reduce((amount: number, sum: any) => {
    console.log(sum);
    return sum.amount + amount;
  }, 0);

  return totalAmount;
}

export async function rechargeCard(
  cardId: number,
  amount: number,
  apiKey: string
) {
  try {
    await companyService.companyCheck(apiKey);
    const card = await registeredCard(cardId);
    expirationDate(card.expirationDate);

    await rechargeRepository.insert({ cardId, amount });
  } catch (err) {
    console.log(err);
  }
}

export async function purchaseCard(
  cardId: number,
  businessId: number,
  password: string,
  amount: number
) {
  const card = await registeredCard(cardId);

  expirationDate(card.expirationDate);
  checkPassword(password, card.password);
  const business = await businessRepository.findById(businessId);

  if (!business) {
    throw { type: "not_found", message: "business doesn't exist" };
  }

  if (business.type !== card.type) {
    throw {
      type: "error_conflict",
      message: "Business and Card type doesn't match",
    };
  }
  const cardBalance = await getBalance(cardId);
  if (cardBalance.balance < amount) {
    throw {
      type: "forbidden",
      message: "Insuficient balance",
    };
  }
  await paymentRepository.insert({ cardId, businessId, amount });
}

export function checkPassword(password: string, hashPassword: string) {
  if (!bcrypt.compareSync(password, hashPassword)) {
    throw { type: "forbidden", message: "password doesn't match" };
  }
}
