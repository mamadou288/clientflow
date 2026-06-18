import { companies } from "../data/companies";
import { simulateRequest, nextId, today } from "./mockApi";

export function getCompanies() {
  return simulateRequest(companies);
}

export function getCompanyById(id) {
  const company = companies.find((c) => c.id === Number(id)) ?? null;
  return simulateRequest(company);
}

export function createCompany(payload) {
  const company = {
    ...payload,
    id: nextId(companies),
    createdAt: today(),
  };
  companies.push(company);
  return simulateRequest(company);
}

export function deleteCompany(id) {
  const index = companies.findIndex((c) => c.id === Number(id));
  if (index !== -1) companies.splice(index, 1);
  return simulateRequest({ id: Number(id) });
}
