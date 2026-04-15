import React from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {

    const navigate = useNavigate();

    // TEMP ROLE SYSTEM (later we connect real auth)
    const role = "Landlord"; // change to Tenant or Agent for now

    const user = {
        name: "James Anderson",
        email: "james@email.com",
        phone: "+234 800 000 0000",
        location: "Lagos, Nigeria"
    };

    const renderRoleStats = () => {
        if (role === "Landlord") {
            return (
                <>
                    <div className="stat-box">
                        <h3>Properties</h3>
                        <p>2</p>
                    </div>
                    <div className="stat-box">
                        <h3>Tenants</h3>
                        <p>10</p>
                    </div>
                    <div className="stat-box">
                        <h3>Monthly Income</h3>
                        <p>₦2,000,000</p>
                    </div>
                </>
            );
        }

        if (role === "Agent") {
            return (
                <>
                    <div className="stat-box">
                        <h3>Clients</h3>
                        <p>5</p>
                    </div>
                    <div className="stat-box">
                        <h3>Active Deals</h3>
                        <p>3</p>
                    </div>
                    <div className="stat-box">
                        <h3>Closed Deals</h3>
                        <p>8</p>
                    </div>
                </>
            );
        }

        return (
            <>
                <div className="stat-box">
                    <h3>Applications</h3>
                    <p>4</p>
                </div>
                <div className="stat-box">
                    <h3>Saved Homes</h3>
                    <p>7</p>
                </div>
                <div className="stat-box">
                    <h3>Active Requests</h3>
                    <p>2</p>
                </div>
            </>
        );
    };

    return (
        <div className="profile-page">

            {/* TOP BAR */}
            <div className="profile-topbar">
                <button className="back-btn" onClick={() => navigate(-1)}>
                    ← Back
                </button>

                <h2>Profile</h2>
            </div>

            {/* PROFILE CARD */}
            <div className="profile-card">

                <div className="profile-avatar">
                    {user.name.charAt(0)}
                </div>

                <h3>{user.name}</h3>
                <p className="role-badge">{role}</p>

                <div className="profile-info">
                    <p><b>Email:</b> {user.email}</p>
                    <p><b>Phone:</b> {user.phone}</p>
                    <p><b>Location:</b> {user.location}</p>
                </div>

                <button className="primary">Edit Profile</button>
            </div>

            {/* ROLE STATS */}
            <div className="profile-stats">
                {renderRoleStats()}
            </div>

        </div>
    );
}