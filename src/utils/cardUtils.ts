import * as faker from "@faker-js/faker";
import bcrypt from "bcrypt";
import dayjs from "dayjs";
import * as cardRepository from "../repositories/cardRepository.js";

export async function formatCardName(employeeName: string) {
  const fullName = employeeName.split(" ");
  const cardName = [];
  for (let i = 0; i < fullName.length; i++) {
    if (i === 0 || i === fullName.length - 1) {
      cardName.push(fullName[i]);
    } else if (fullName[i].length >= 3) {
      cardName.push(fullName[i][0]);
    }
  }
  return cardName.join(" ").toUpperCase();
}

export async function formatCreditCard(
  employeeId: number,
  cardName: string,
  type: cardRepository.TransactionTypes
) {
  let numberCard = faker.faker.finance.creditCardNumber("mastercard");

  const CVV = faker.faker.finance.creditCardCVV();


  const card: cardRepository.CardInsertData = {
    number: numberCard,
    employeeId,
    cardholderName: cardName,
    securityCode: CVV,
    expirationDate: dayjs(Date.now()).add(5, "year").format("MM/YY"),
    password: null,
    isVirtual: false,
    originalCardId: null,
    isBlocked: true,
    type,
  };
  return card;
}

export async function verifyCardType(
  employeeId: number,
  type: cardRepository.TransactionTypes
) {
  return cardRepository.findByTypeAndEmployeeId(type, employeeId);
}

