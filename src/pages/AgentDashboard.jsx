import React from "react";
import { useNavigate } from "react-router-dom";

export default function AgentDashboard() {

    const navigate = useNavigate();

    const stats = [
        { title: "Active Clients", value: 5 },
        { title: "Pending Deals", value: 3 },
        { title: "Closed Deals", value: 8 },
    ];

    return (
        <div className="dashboard-layout">

            {/* NAV */}
            <div className="dashboard-nav">
                <h3>VitRent</h3>

                <div className="dashboard-nav-links">
                    <span>Dashboard</span>
                    <span>Clients</span>
                    <span>Deals</span>
                    <span>Listings</span>
                    <span onClick={() => navigate("/profile")}>Profile</span>
                </div>
            </div>

            {/* HEADER */}
            <div className="dashboard-header">
                <h2>Good morning, Agent 👋</h2>
                <p>Track your clients and deals</p>
            </div>

            {/* STATS */}
            <div className="stats-grid">
                {stats.map((s, i) => (
                    <div className="stat-box" key={i}>
                        <h3>{s.title}</h3>
                        <p>{s.value}</p>
                    </div>
                ))}
            </div>

            {/* CLIENTS */}
            <div className="dashboard-section">
                <h3>Active Clients</h3>

                <div className="request-slider">
                    {[1, 2, 3].map(i => (
                        <div className="request-card" key={i}>
                            <p><b>Client {i}</b></p>
                            <p>Interested in property</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* LISTINGS */}
            <div className="dashboard-section">
                <h3>Listings</h3>

                <div className="listing-grid">
                    {[1, 2, 3].map(i => (
                        <div className="listing-card" key={i}>
                            <h4>Listing {i}</h4>
                            <p className="status">Active</p>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}