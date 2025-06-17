import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5294/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
