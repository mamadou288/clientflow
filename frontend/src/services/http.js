/**
 * Client HTTP de l'API REST.
 * - Ajoute automatiquement l'en-tête Authorization: Bearer <access> si présent.
 * - Sur un 401, tente UNE fois de renouveler l'access via le refresh token, puis
 *   rejoue la requête. Si le refresh échoue, purge les tokens et signale l'expiration.
 * En dev, les appels partent en relatif ("/api/...") et le proxy Vite les transfère.
 */
import { getAccess, getRefresh, setTokens, clearTokens } from "./authStorage";

const API_BASE = import.meta.env.VITE_API_URL ?? "/api";

async function rawRequest(path, { method = "GET", body, token } = {}) {
  const headers = {};
  if (body != null) headers["Content-Type"] = "application/json";
  if (token) headers.Authorization = `Bearer ${token}`;

  return fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: body != null ? JSON.stringify(body) : undefined,
  });
}

// Renouvelle l'access token avec le refresh. Renvoie le nouvel access, ou null.
async function refreshAccess() {
  const refresh = getRefresh();
  if (!refresh) return null;

  const res = await rawRequest("/auth/token/refresh/", {
    method: "POST",
    body: { refresh },
  });

  if (!res.ok) {
    clearTokens();
    window.dispatchEvent(new Event("auth:expired"));
    return null;
  }

  const data = await res.json();
  setTokens({ access: data.access });
  return data.access;
}

async function request(path, options = {}) {
  let res = await rawRequest(path, { ...options, token: getAccess() });

  // Access expiré → un seul essai de refresh, puis on rejoue.
  if (res.status === 401 && getRefresh()) {
    const newAccess = await refreshAccess();
    if (newAccess) res = await rawRequest(path, { ...options, token: newAccess });
  }

  if (!res.ok) {
    const error = new Error(`HTTP ${res.status} sur ${options.method || "GET"} ${path}`);
    error.status = res.status;
    throw error;
  }

  if (res.status === 204) return null; // ex. DELETE
  return res.json();
}

export const api = {
  get: (path) => request(path),
  getOrNull: (path) =>
    request(path).catch((err) => {
      if (err.status === 404) return null;
      throw err;
    }),
  post: (path, body) => request(path, { method: "POST", body }),
  patch: (path, body) => request(path, { method: "PATCH", body }),
  del: (path) => request(path, { method: "DELETE" }),
};
