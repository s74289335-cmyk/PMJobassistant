import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  timeout: 30000, // 🔥 prevents hanging requests
});

// 🔹 REQUEST INTERCEPTOR
API.interceptors.request.use(
  (config) => {
    console.log("🚀 API Request:", config.url);
    return config;
  },
  (error) => Promise.reject(error)
);

// 🔹 RESPONSE INTERCEPTOR
API.interceptors.response.use(
  (response) => {
    console.log("✅ API Response:", response.data);
    return response;
  },
  (error) => {
    console.error("❌ API Error:", error?.response?.data || error.message);

    // 🔥 Global error handling
    if (error.response?.status === 401) {
      alert("Session expired. Please login again.");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default API;