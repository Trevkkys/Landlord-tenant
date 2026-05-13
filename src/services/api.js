// src/services/api.js
const BASE_URL = import.meta.env.VITE_API_URL || 'https://rent-safe-backend.onrender.com';

const getAuthToken = () => {
    const token = localStorage.getItem("token");
    return token ? `Bearer ${token}` : null;
};

export const profileService = {
    // Added /api/v1/ to all of these
    getProfile: async (role) => {
        const response = await fetch(`${BASE_URL}/api/v1/profile/${role}/`, {
            method: "GET",
            headers: {
                "Authorization": getAuthToken(),
                "Content-Type": "application/json"
            },
        });
        if (!response.ok) throw new Error("Failed to fetch profile");
        return response.json();
    },

    updateProfile: async (role, data) => {
        const response = await fetch(`${BASE_URL}/api/v1/profile/${role}/`, {
            method: "PATCH",
            headers: {
                "Authorization": getAuthToken(),
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error("Update failed");
        return response.json();
    },

    // 3. CHANGE PASSWORD (Exactly what you had)
    changePassword: async (role, data) => {
        const response = await fetch(`${BASE_URL}/api/v1/profile/${role}/change-password/`, {
            method: "PATCH",
            headers: {
                "Authorization": getAuthToken(),
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error("Failed to change password");
        return response.json();
    },

    // 4. UPLOAD IMAGE
    uploadImage: async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_type', 'profile_image');

        const response = await fetch(`${BASE_URL}/api/v1/uploads`, {
            method: "POST",
            headers: { "Authorization": getAuthToken() },
            body: formData,
        });

        if (!response.ok) {
            // Log the actual URL that failed to the console so you can see it
            console.error("Failed URL:", `${BASE_URL}/api/v1/uploads`);
            throw new Error('Upload failed');
        }
        return response.json();
    },

    updateProfileAvatar: async (role, filePath) => {
        const response = await fetch(`${BASE_URL}/api/v1/profile/${role}/`, {
            method: "PATCH",
            headers: {
                "Authorization": getAuthToken(),
                "Content-Type": "application/json"
            },
            // Note: The key here is 'profile_image' to match your Postman success
            body: JSON.stringify({ profile_image: filePath }),
        });
        if (!response.ok) throw new Error("Failed to save avatar to profile");
        return response.json();
    }
};