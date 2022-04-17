import * as faker from "@faker-js/faker";
import dayjs from "dayjs";
import bcrypt from "bcrypt";
import * as companyService from "./companyService.js";
import * as cardRepository from "../repositories/cardRepository.js";
import * as employeeRepository from "../repositories/employeeRepository.js";
import * as paymentRepository from "../repositories/paymentRepository.js";
import * as recahargeRepository from "../repositories/rechargeRepository.js";

export async function createCard(
  apiKey: string,
  employeeId: number,
  type: cardRepository.TransactionTypes
) {
  await companyService.companyCheck(apiKey);
  const employee = await employeeRepository.findById(employeeId);
  if (!employee) {
    throw { type: "not_found", message: "employee not exist" };
  }

}


