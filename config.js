// config.js

const BASE_URL = "https://lets-teach-backend-v38i.onrender.com";

/* ===========================
   API FETCH HELPER
=========================== */

async function apiFetch(url, options = {}) {

  const token = localStorage.getItem("token");

  const isFormData =
    options.body instanceof FormData;

  const headers = {
    ...(options.headers || {})
  };

  /* ===========================
     JWT TOKEN
  =========================== */

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  /* ===========================
     CONTENT TYPE
     FormData ke saath Content-Type
     manually set nahi karna
  =========================== */

  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }

  try {

    const response = await fetch(url, {
      ...options,
      headers
    });

    /* ===========================
       AUTH ERROR
    =========================== */

    if (response.status === 401) {

      alert("Session expired. Please login again.");

      localStorage.clear();

      window.location.href = "login.html";

      return null;
    }

    if (response.status === 403) {

      alert("Unauthorized access.");

      return null;
    }

    return response;

  } catch (err) {

    console.error("API FETCH ERROR:", err);

    throw err;
  }
}