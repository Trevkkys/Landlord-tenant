// src/services/api.js

// src/services/api.js
const BASE_URL = "https://rent-safe-backend.onrender.com/api/v1";

const getAuthHeader = () => {
    const token = localStorage.getItem("token");

    if (!token) {
        console.error("DEBUG: No token found in localStorage!");
        return {};
    }

    return {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
    };
};

export const profileService = {
    getProfile: async (role) => {
        const response = await fetch(`${BASE_URL}/profile/${role}/`, {
            method: "GET",
            headers: getAuthHeader(),
        });
        if (response.status === 401) throw new Error("Session expired. Please login again.");
        if (!response.ok) throw new Error("Failed to fetch profile");
        return response.json();
    },

    updateProfile: async (role, data) => {
        const response = await fetch(`${BASE_URL}/profile/${role}/`, {
            method: "PATCH",
            headers: getAuthHeader(),
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error("Update failed");
        return response.json();
    },

    changePassword: async (role, data) => {
        const response = await fetch(`${BASE_URL}/profile/${role}/change-password/`, {
            method: "PATCH",
            headers: {
                ...getAuthHeader(),
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error("Failed to change password");
        return response.json();
    }
};