import { api } from "./http";
import { setTokens, clearTokens, getRefresh } from "./authStorage";

export async function login(username, password) {
  const tokens = await api.post("/auth/token/", { username, password });
  setTokens(tokens);
  return tokens;
}

export function logout() {
  clearTokens();
}

export function getMe() {
  return api.get("/auth/me/");
}

// Une session existe si on a un refresh token (à valider ensuite via /me).
export const hasSession = () => Boolean(getRefresh());
