// config.js

const BASE_URL = "https://lets-teach-backend-v38i.onrender.com";

/* ===========================
   Secure Fetch Helper
=========================== */

async function apiFetch(url, options = {}) {
  const role = localStorage.getItem("role");
  const uid = localStorage.getItem("uid");

  const defaultHeaders = {
    "Content-Type": "application/json",
    "x-role": role || "",
    "x-uid": uid || ""
  };

  const response = await fetch(url, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...(options.headers || {})
    }
  });

  // 🔥 Auto logout if unauthorized
  if (response.status === 401 || response.status === 403) {
    alert("Session expired or unauthorized");
    localStorage.clear();
    window.location.href = "login.html";
    return;
  }

  return response;
}
