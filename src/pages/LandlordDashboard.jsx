import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LandlordDashboard() {
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState("dashboard");

    const [requests, setRequests] = useState([
        { id: 1, agent: "Agent John", property: "Lekki 2 Bedroom" },
        { id: 2, agent: "Agent Sarah", property: "Ikoyi Duplex" },
    ]);

    const listings = [
        { id: 1, title: "3 Bedroom Flat", status: "Active" },
        { id: 2, title: "2 Bedroom Apartment", status: "Active" },
        { id: 3, title: "Mini Flat", status: "Pending" },
    ];

    const approve = (id) => setRequests(requests.filter(r => r.id !== id));
    const decline = (id) => setRequests(requests.filter(r => r.id !== id));

    return (
        <div className="dashboard-layout">

            {/* TOP NAV */}
            <div className="dashboard-nav">
                <h3>VitRent</h3>

                <div className="dashboard-nav-links">
                    <span onClick={() => setActiveTab("dashboard")}>Dashboard</span>
                    <span onClick={() => setActiveTab("listings")}>Listings</span>
                    <span onClick={() => setActiveTab("requests")}>Requests</span>
                    <span onClick={() => setActiveTab("earnings")}>Earnings</span>
                    <span onClick={() => navigate("/profile")}>Profile</span>
                </div>
            </div>

            {/* HEADER */}
            <div className="dashboard-header">
                <h2>Good morning, James 👋</h2>
                <p>Here’s your property performance overview</p>
            </div>

            {/* STATS */}
            <div className="stats-grid">
                <div className="stat-box">
                    <h3>Active Listings</h3>
                    <p>{listings.length}</p>
                </div>

                <div className="stat-box">
                    <h3>Pending Requests</h3>
                    <p>{requests.length}</p>
                </div>

                <div className="stat-box">
                    <h3>Monthly Earnings</h3>
                    <p>₦2,000,000</p>
                </div>
            </div>

            {/* DASHBOARD TAB */}
            {activeTab === "dashboard" && (
                <>
                    <div className="dashboard-section">
                        <h3>Quick Requests Preview</h3>

                        <div className="request-slider">
                            {requests.map(r => (
                                <div className="request-card" key={r.id}>
                                    <p><b>{r.agent}</b></p>
                                    <p>{r.property}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="dashboard-section">
                        <h3>Active Listings Preview</h3>

                        <div className="listing-grid">
                            {listings.slice(0, 3).map(l => (
                                <div className="listing-card" key={l.id}>
                                    <h4>{l.title}</h4>
                                    <p className="status">{l.status}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}

            {/* REQUEST TAB */}
            {activeTab === "requests" && (
                <div className="dashboard-section">
                    <h3>All Pending Requests</h3>

                    <div className="request-slider">
                        {requests.map(r => (
                            <div className="request-card" key={r.id}>
                                <p><b>{r.agent}</b></p>
                                <p>{r.property}</p>

                                <div className="request-actions">
                                    <button className="approve" onClick={() => approve(r.id)}>Approve</button>
                                    <button className="decline" onClick={() => decline(r.id)}>Decline</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* LISTINGS TAB */}
            {activeTab === "listings" && (
                <div className="dashboard-section">
                    <h3>All Listings</h3>

                    <div className="listing-grid">
                        {listings.map(l => (
                            <div className="listing-card" key={l.id}>
                                <h4>{l.title}</h4>
                                <p className="status">{l.status}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* EARNINGS TAB */}
            {activeTab === "earnings" && (
                <div className="dashboard-section">
                    <h3>Earnings Overview</h3>

                    <div className="stats-grid">
                        <div className="stat-box">
                            <h3>This Month</h3>
                            <p>₦2,000,000</p>
                        </div>

                        <div className="stat-box">
                            <h3>Total Income</h3>
                            <p>₦10,500,000</p>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}