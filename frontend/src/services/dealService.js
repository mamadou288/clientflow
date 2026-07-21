import { api } from "./http";

export function getDeals() {
  return api.get("/deals/");
}

export function getDealById(id) {
  return api.getOrNull(`/deals/${id}/`);
}

export function getDealsByCompany(companyId) {
  return api.get(`/deals/?company=${companyId}`);
}

export function getDealsByContact(contactId) {
  return api.get(`/deals/?contact=${contactId}`);
}

export function createDeal(payload) {
  return api.post("/deals/", payload);
}

export function deleteDeal(id) {
  return api.del(`/deals/${id}/`).then(() => ({ id: Number(id) }));
}
