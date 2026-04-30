import axios from "axios";

const API = axios.create({
    baseURL: "https://rent-safe-backend.onrender.com",
});

// REGISTER
export const registerUser = (data) =>
    API.post("/api/v1/auth/register", data);

// LOGIN (we’ll use this next)
export const loginUser = (data) =>
    API.post("/api/v1/auth/login", data);