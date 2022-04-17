import * as faker from "@faker-js/faker";
import dayjs from "dayjs";
import bcrypt from "bcrypt";
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
  ////A chave de API deve ser possuida por alguma empresa
  await companyService.companyCheck(apiKey);

  ////Somente empregados cadastrados devem possuir cartões
  const employee = await employeeRepository.findById(employeeId);
  if (!employee) {
    throw { type: "not_found", message: "employee not exist" };
  }

  ////////  Empregados não podem possuir mais de um cartão do mesmo tipo
  const existingCard = await cardUtils.verifyCardType(employeeId, type);
  if (existingCard)
    throw { erro_type: "conflict_error", message: "Card type already in use" };
}
//!Fim
