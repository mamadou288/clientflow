import { deals } from "../data/deals";
import { simulateRequest, nextId, today } from "./mockApi";

export function getDeals() {
  return simulateRequest(deals);
}

export function getDealById(id) {
  const deal = deals.find((d) => d.id === Number(id)) ?? null;
  return simulateRequest(deal);
}

export function getDealsByCompany(companyId) {
  const result = deals.filter((d) => d.companyId === Number(companyId));
  return simulateRequest(result);
}

export function getDealsByContact(contactId) {
  const result = deals.filter((d) => d.contactId === Number(contactId));
  return simulateRequest(result);
}

export function createDeal(payload) {
  const deal = {
    ...payload,
    id: nextId(deals),
    createdAt: today(),
  };
  deals.push(deal);
  return simulateRequest(deal);
}

export function deleteDeal(id) {
  const index = deals.findIndex((d) => d.id === Number(id));
  if (index !== -1) deals.splice(index, 1);
  return simulateRequest({ id: Number(id) });
}
