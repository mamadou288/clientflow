import { contacts } from "../data/contacts";
import { simulateRequest, nextId, today } from "./mockApi";

export function getContacts() {
  return simulateRequest(contacts);
}

export function getContactById(id) {
  const contact = contacts.find((c) => c.id === Number(id)) ?? null;
  return simulateRequest(contact);
}

export function getContactsByCompany(companyId) {
  const result = contacts.filter((c) => c.companyId === Number(companyId));
  return simulateRequest(result);
}

export function createContact(payload) {
  const contact = {
    ...payload,
    id: nextId(contacts),
    createdAt: today(),
  };
  contacts.push(contact);
  return simulateRequest(contact);
}

export function deleteContact(id) {
  const index = contacts.findIndex((c) => c.id === Number(id));
  if (index !== -1) contacts.splice(index, 1);
  return simulateRequest({ id: Number(id) });
}
