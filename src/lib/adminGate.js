const SESSION_KEY = "kavaroc_admin";
const SESSION_VALUE = "unlocked";

const DEFAULT_PASSWORD = "kavarocIn@123";

export function getAdminPassword() {
  if (typeof window === "undefined") return DEFAULT_PASSWORD;
  const fromStorage = localStorage.getItem("kavaroc_admin_password");
  if (fromStorage) return fromStorage;
  return DEFAULT_PASSWORD;
}

export function setAdminPassword(newPassword) {
  if (typeof window === "undefined") return;
  if (!newPassword || newPassword.length < 4) return;
  localStorage.setItem("kavaroc_admin_password", newPassword);
}

export function isAdmin() {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(SESSION_KEY) === SESSION_VALUE;
}

export function tryUnlock(input) {
  return input === getAdminPassword();
}

export function unlock() {
  sessionStorage.setItem(SESSION_KEY, SESSION_VALUE);
  window.dispatchEvent(new Event("admin-changed"));
}

export function lock() {
  sessionStorage.removeItem(SESSION_KEY);
  window.dispatchEvent(new Event("admin-changed"));
}
