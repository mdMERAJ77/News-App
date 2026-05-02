import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.NEWS_API_KEY || "http://localhost:5000",
    timeout: 5000,
});

export default api;