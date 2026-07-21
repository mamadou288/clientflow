/**
 * Tiny helper that makes the mocked services behave like a real async API.
 * Swapping the data layer for HTTP later means replacing the service bodies
 * (e.g. with fetch/axios) — the function signatures stay identical.
 */

const NETWORK_DELAY = 250;

export function simulateRequest(data) {
  return new Promise((resolve) => {
    // structuredClone prevents callers from mutating the in-memory "DB".
    setTimeout(() => resolve(structuredClone(data)), NETWORK_DELAY);
  });
}

export function nextId(items) {
  return items.reduce((max, item) => Math.max(max, item.id), 0) + 1;
}

export function today() {
  return new Date().toISOString().slice(0, 10);
}
