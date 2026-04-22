import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";

export default function AdminDashboard() {
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("vitRentUser"));

    // 🔐 PROTECT ADMIN (FIXED)
    useEffect(() => {
        if (!user || user.role !== "admin") {
            navigate("/");
        }
    }, [user, navigate]);

    // 🔴 LOGOUT FUNCTION
    const handleLogout = () => {
        localStorage.removeItem("vitRentUser");
        navigate("/");
    };

    if (!user) return null;

    return (
        <div className="admin-layout">

            {/* SIDEBAR */}
            <div className="admin-sidebar">
                <h2 className="admin-logo">VitRent Admin</h2>

                <nav>
                    <p onClick={() => navigate("/")}>Home</p>
                    <p className="active">Dashboard</p>
                    <p onClick={() => navigate("/admin/users")}>Users</p>
                    <p onClick={() => navigate("/admin/properties")}>Properties</p>
                    <p onClick={() => navigate("/admin/transactions")}>Transactions</p>
                    <p onClick={() => navigate("/admin/disputes")}>Disputes</p>
                </nav>

                {/* 🔴 LOGOUT BUTTON IN SIDEBAR */}
                <button className="logout-btn" onClick={handleLogout}>
                    Logout
                </button>
            </div>

            {/* MAIN CONTENT */}
            <div className="admin-content">

                {/* HEADER */}
                <div className="admin-header">
                    <div>
                        <h2>Welcome, {user.name} 👋🏾</h2>
                    </div>

                    {/* 🔴 LOGOUT (TOP RIGHT OPTION) */}
                    <button className="logout-btn" onClick={handleLogout}>
                        Logout
                    </button>
                </div>

                {/* STATS */}
                <div className="admin-stats">

                    <div className="admin-card">
                        <h3>Total Users</h3>
                        <p>1,245</p>
                    </div>

                    <div className="admin-card">
                        <h3>Active Listings</h3>
                        <p>342</p>
                    </div>

                    <div className="admin-card">
                        <h3>Total Transactions</h3>
                        <p>₦120.4M</p>
                    </div>

                    <div className="admin-card">
                        <h3>In Escrow</h3>
                        <p>₦3.1M</p>
                    </div>

                </div>

                {/* QUICK ACTIONS */}
                <div className="admin-section">
                    <h3>Quick Actions</h3>

                    <div className="admin-actions">
                        <button onClick={() => navigate("/admin/users")}>
                            Manage Users
                        </button>

                        <button onClick={() => navigate("/admin/properties")}>
                            Approve Listings
                        </button>

                        <button onClick={() => navigate("/admin/transactions")}>
                            View Transactions
                        </button>

                        <button onClick={() => navigate("/admin/disputes")}>
                            Resolve Disputes
                        </button>
                    </div>
                </div>

                {/* RECENT ACTIVITY */}
                <div className="admin-section">
                    <h3>Recent Activity</h3>

                    <div className="admin-activity">

                        <div className="activity-item">
                            <p><strong>Landlord</strong> added a new property in Lekki</p>
                        </div>

                        <div className="activity-item">
                            <p><strong>Tenant</strong> applied for a 2-bedroom apartment</p>
                        </div>

                        <div className="activity-item">
                            <p><strong>Agent</strong> closed a deal worth ₦850,000</p>
                        </div>

                        <div className="activity-item">
                            <p><strong>Dispute</strong> reported on a listing</p>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}