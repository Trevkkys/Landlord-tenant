import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Profile() {
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("vitUser"));

    const [activeTab, setActiveTab] = useState("overview");

    const rating = 4.8;

    const renderStars = (rating) => {
        const full = Math.floor(rating);
        const half = rating % 1 >= 0.5;

        return (
            <>
                {"★".repeat(full)}
                {half && "☆"}
            </>
        );
    };

    const getStats = () => {
        if (user?.role === "landlord") {
            return [
                { label: "Properties", value: "12" },
                { label: "Tenants", value: "8" },
                { label: "Earnings", value: "₦2.4M" },
            ];
        }

        if (user?.role === "tenant") {
            return [
                { label: "Rented", value: "2" },
                { label: "Applications", value: "5" },
                { label: "Saved", value: "10" },
            ];
        }

        if (user?.role === "agent") {
            return [
                { label: "Listings", value: "20" },
                { label: "Clients", value: "15" },
                { label: "Deals", value: "7" },
            ];
        }
    };

    return (
        <div className="dashboard-layout">
            <Navbar />

            <div className="dashboard-content">

                {/* HEADER */}
                <div className="profile-header-modern">

                    <div className="avatar-wrapper">
                        <div className="profile-avatar">
                            {user?.name?.charAt(0)}
                            <span className="camera-icon">📷</span>
                        </div>
                    </div>

                    <div className="profile-info">
                        <h2>{user?.name}</h2>

                        <div className="verified-badge">
                            ✔ Verified User
                        </div>

                        <div className="profile-role">
                            {user?.role} Account
                        </div>

                        <div className="profile-reviews">
                            <span className="stars">{renderStars(rating)}</span>
                            <span className="rating-text">{rating} ★ Rating</span>
                        </div>
                    </div>

                </div>

                {/* STATS */}
                <div className="profile-stats">
                    {getStats()?.map((stat, index) => (
                        <div className="profile-stat-box" key={index}>
                            <h4>{stat.label}</h4>
                            <p>{stat.value}</p>
                        </div>
                    ))}
                </div>

                {/* MAIN */}
                <div className="profile-container">

                    {/* SIDEBAR */}
                    <div className="profile-sidebar">
                        <button onClick={() => setActiveTab("overview")}>Overview</button>
                        <button onClick={() => setActiveTab("edit")}>Edit Profile</button>
                        <button onClick={() => setActiveTab("password")}>Change Password</button>
                        <button onClick={() => setActiveTab("bank")}>Bank Details</button>
                        <button onClick={() => setActiveTab("reviews")}>Reviews</button>
                        <button onClick={() => setActiveTab("help")}>Help & FAQ</button>
                    </div>

                    {/* CONTENT */}
                    <div className="profile-content">

                        {activeTab === "overview" && (
                            <div className="profile-box">
                                <h3>Profile Overview</h3>
                                <p><b>Name:</b> {user?.name}</p>
                                <p><b>Email:</b> {user?.email}</p>
                                <p><b>Role:</b> {user?.role}</p>
                            </div>
                        )}

                        {activeTab === "edit" && (
                            <div className="profile-box">
                                <h3>Edit Profile</h3>
                                <input placeholder="Full Name" />
                                <input placeholder="Email" />
                                <button className="primary">Save Changes</button>
                            </div>
                        )}

                        {activeTab === "password" && (
                            <div className="profile-box">
                                <h3>Change Password</h3>
                                <input placeholder="Old Password" />
                                <input placeholder="New Password" />
                                <button className="primary">Update Password</button>
                            </div>
                        )}

                        {activeTab === "bank" && (
                            <div className="profile-box">
                                <h3>Bank Details</h3>
                                <input placeholder="Bank Name" />
                                <input placeholder="Account Number" />
                                <button className="primary">Save</button>
                            </div>
                        )}

                        {activeTab === "reviews" && (
                            <div className="profile-box">
                                <h3>Reviews</h3>
                                <div className="review">⭐️⭐️⭐️⭐️⭐️ Great experience!</div>
                                <div className="review">⭐️⭐️⭐️⭐️ Very responsive</div>
                            </div>
                        )}

                        {activeTab === "help" && (
                            <div className="profile-box">
                                <h3>Help & FAQ</h3>
                                <p>Contact support@vitrent.com</p>
                            </div>
                        )}

                    </div>

                </div>

            </div>
        </div>
    );
}