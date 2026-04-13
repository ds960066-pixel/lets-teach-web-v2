// config.js

const BASE_URL = "https://lets-teach-backend-v38i.onrender.com";

/* ===========================
   Secure Fetch Helper
=========================== */

async function apiFetch(url, options = {}) {
  const role = localStorage.getItem("role");

  // ✅ NEW (_id based)
  const teacherId = localStorage.getItem("teacherId");
  const instituteId = localStorage.getItem("instituteId");

  const isFormData = options.body instanceof FormData;

  const defaultHeaders = {
    "x-role": role || "",
    "x-teacher-id": teacherId || "",
    "x-institute-id": instituteId || ""
  };

  // Only add Content-Type if NOT FormData
  if (!isFormData) {
    defaultHeaders["Content-Type"] = "application/json";
  }

  const response = await fetch(url, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...(options.headers || {})
    }
  });

  // Handle unauthorized
  if (response.status === 401 || response.status === 403) {
    alert("Session expired or unauthorized");
    localStorage.clear();
    window.location.href = "login.html";
    throw new Error("Unauthorized");
  }

  return response;
}