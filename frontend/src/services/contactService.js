import { api } from "./http";

export function getContacts() {
  return api.get("/contacts/");
}

export function getContactById(id) {
  return api.getOrNull(`/contacts/${id}/`);
}

export function getContactsByCompany(companyId) {
  return api.get(`/contacts/?company=${companyId}`);
}

export function createContact(payload) {
  return api.post("/contacts/", payload);
}

export function deleteContact(id) {
  return api.del(`/contacts/${id}/`).then(() => ({ id: Number(id) }));
}
