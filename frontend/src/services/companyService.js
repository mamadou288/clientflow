import { api } from "./http";

export function getCompanies() {
  return api.get("/companies/");
}

export function getCompanyById(id) {
  return api.getOrNull(`/companies/${id}/`);
}

export function createCompany(payload) {
  return api.post("/companies/", payload);
}

export function deleteCompany(id) {
  return api.del(`/companies/${id}/`).then(() => ({ id: Number(id) }));
}
