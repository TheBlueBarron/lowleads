import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:10000/api",
});

// Add token to every request if it exists
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
