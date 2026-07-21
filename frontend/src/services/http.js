/**
 * Petit client HTTP pour l'API REST du backend.
 * En dev, les appels partent en relatif ("/api/...") et le proxy Vite les
 * transfère vers le backend (voir vite.config.js) → aucune config CORS.
 * VITE_API_URL permet de pointer vers une URL absolue si besoin.
 */
const API_BASE = import.meta.env.VITE_API_URL ?? "/api";

async function request(path, { method = "GET", body } = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: body != null ? { "Content-Type": "application/json" } : undefined,
    body: body != null ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const error = new Error(`HTTP ${res.status} sur ${method} ${path}`);
    error.status = res.status;
    throw error;
  }

  // 204 No Content (ex. DELETE) → pas de corps à parser.
  if (res.status === 204) return null;
  return res.json();
}

export const api = {
  get: (path) => request(path),
  // Renvoie null sur un 404 (au lieu de lever) — pratique pour les pages de détail.
  getOrNull: (path) =>
    request(path).catch((err) => {
      if (err.status === 404) return null;
      throw err;
    }),
  post: (path, body) => request(path, { method: "POST", body }),
  patch: (path, body) => request(path, { method: "PATCH", body }),
  del: (path) => request(path, { method: "DELETE" }),
};
