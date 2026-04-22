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
                        <h2>{user?.name || "User Name"}</h2>

                        <div className="verified-badge">
                            ✔ Verified User
                        </div>

                        <div className="profile-reviews">
                            <span className="stars">{renderStars(rating)}</span>
                            <span className="rating-text">{rating} ★ Rating</span>
                        </div>
                    </div>

                </div>

                {/* 🔥 PROFILE SUMMARY (NEW) */}
                <div className="profile-summary">

                    <div className="summary-card">
                        <h4>Account Status</h4>
                        <p>Active</p>
                    </div>

                    <div className="summary-card">
                        <h4>Member Since</h4>
                        <p>2026</p>
                    </div>

                    <div className="summary-card">
                        <h4>Profile Completion</h4>
                        <p>75%</p>
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

                {/* QUICK ACTIONS */}
                <div className="profile-actions">

                    <button onClick={() => navigate("/")}>
                        Browse Properties
                    </button>

                    <button
                        onClick={() => {
                            const storedUser = JSON.parse(localStorage.getItem("vitRentUser"));
                            const role = (storedUser?.role || "").toLowerCase();

                            if (role === "tenant") {
                                navigate("/tenant");
                            } else if (role === "landlord") {
                                navigate("/landlord");
                            } else if (role === "agent") {
                                navigate("/agent");
                            } else {
                                alert("Session error. Please login again.");
                                navigate("/login");
                            }
                        }}
                    >
                        Go to Dashboard
                    </button>

                </div>

                {/* MAIN */}
                <div className="profile-container">

                    {/* SIDEBAR */}
                    <div className="profile-sidebar">

                        <button className={activeTab === "overview" ? "active" : ""}
                            onClick={() => setActiveTab("overview")}>
                            Overview
                        </button>

                        <button className={activeTab === "edit" ? "active" : ""}
                            onClick={() => setActiveTab("edit")}>
                            Edit Profile
                        </button>

                        <button className={activeTab === "password" ? "active" : ""}
                            onClick={() => setActiveTab("password")}>
                            Change Password
                        </button>

                        <button className={activeTab === "bank" ? "active" : ""}
                            onClick={() => setActiveTab("bank")}>
                            Bank Details
                        </button>

                        <button className={activeTab === "reviews" ? "active" : ""}
                            onClick={() => setActiveTab("reviews")}>
                            Reviews
                        </button>

                        <button className={activeTab === "help" ? "active" : ""}
                            onClick={() => setActiveTab("help")}>
                            Help & FAQ
                        </button>

                    </div>

                    {/* CONTENT */}
                    <div className="profile-content">

                        {activeTab === "overview" && (
                            <div className="profile-box">

                                <h3>Profile Overview</h3>

                                <p><b>Name:</b> {user?.name}</p>
                                <p><b>Email:</b> {user?.email}</p>
                                <p><b>Role:</b> {user?.role}</p>

                                {/* 🔥 ACTIVITY FEED */}
                                <div className="activity-feed">

                                    <h4>Recent Activity</h4>

                                    <div className="activity-item">
                                        Viewed: 2 Bedroom Apartment (Lekki)
                                    </div>

                                    <div className="activity-item">
                                        Saved: Self Contain (Yaba)
                                    </div>

                                    <div className="activity-item">
                                        Application sent to Ikoyi Duplex
                                    </div>

                                </div>

                                {/* TRUST */}
                                <div className="trust-section">

                                    <h4>Trust & Safety</h4>

                                    <p>✔ Verified Email</p>
                                    <p>✔ Secure Login</p>
                                    <p>✔ Activity Monitored</p>

                                </div>

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