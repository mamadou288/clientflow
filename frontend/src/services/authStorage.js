/**
 * Stockage des tokens JWT dans le localStorage.
 * (Simple et suffisant ici ; en prod on discuterait cookie httpOnly vs localStorage.)
 */
const ACCESS_KEY = "cf_access";
const REFRESH_KEY = "cf_refresh";

export const getAccess = () => localStorage.getItem(ACCESS_KEY);
export const getRefresh = () => localStorage.getItem(REFRESH_KEY);

export function setTokens({ access, refresh }) {
  if (access) localStorage.setItem(ACCESS_KEY, access);
  if (refresh) localStorage.setItem(REFRESH_KEY, refresh);
}

export function clearTokens() {
  localStorage.removeItem(ACCESS_KEY);
  localStorage.removeItem(REFRESH_KEY);
}
