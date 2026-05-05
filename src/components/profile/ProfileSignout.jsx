import React from "react";

const ProfileSignOut = () => {
    const handleLogout = () => {
        localStorage.removeItem("vitRentUser");
        window.location.href = "/login";
    };

    return (
        <button className="signout-btn" onClick={handleLogout}>
            Sign Out
        </button>
    );
};

export default ProfileSignOut;