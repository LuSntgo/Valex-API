import * as authRepository from "../repositories/companyRepository.js";

export async function validateCompany(apiKey: string) {
  const validCompany = await authRepository.findByApiKey(apiKey);
  if (!validCompany)
    throw { erro_type: "auth_error", message: "company key invalid" };
  return validCompany;
}
