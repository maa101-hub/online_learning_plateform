// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL, // Change to your backend URL
  withCredentials: true, // 🔑 To allow sending cookies
});

export default api;
