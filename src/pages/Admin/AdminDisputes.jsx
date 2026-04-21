import React, { useState } from "react";
import "./Admin.css";

export default function AdminDisputes() {
    const [filter, setFilter] = useState("open");

    const disputes = [
        {
            id: 1,
            title: "Apartment not as described",
            from: "Mr Onoja",
            against: "Landlord - Mr Leo",
            role: "Tenant",
            status: "open",
            severity: "high",
            date: "Apr 2026"
        },
        {
            id: 2,
            title: "Late rent payment dispute",
            from: "Mr Aliyu",
            against: "Landlord - Mr Chidi",
            role: "Agent",
            status: "under review",
            severity: "medium",
            date: "Apr 2026"
        },
        {
            id: 3,
            title: "Refund request after cancellation",
            from: "Mr Eddie",
            against: "System",
            role: "Landlord",
            status: "resolved",
            severity: "low",
            date: "Mar 2026"
        }
    ];

    const filtered = disputes.filter((d) => {
        return filter === "all" || d.status === filter;
    });

    return (
        <div className="admin-page">

            {/* HEADER */}
            <div className="admin-page-header">
                <h2>Dispute Resolution Center</h2>
            </div>

            {/* STATUS FILTERS */}
            <div className="user-filters">
                <button onClick={() => setFilter("open")}>Open</button>
                <button onClick={() => setFilter("under review")}>Under Review</button>
                <button onClick={() => setFilter("resolved")}>Resolved</button>
            </div>

            {/* GRID */}
            <div className="dispute-list">

                {filtered.map((d) => (
                    <div key={d.id} className="dispute-card">

                        {/* HEADER */}
                        <div className="dispute-top">
                            <h3>{d.title}</h3>

                            <span className={`severity ${d.severity}`}>
                                {d.severity}
                            </span>
                        </div>

                        {/* DETAILS */}
                        <p className="muted">
                            From: {d.from}
                        </p>

                        <p className="muted">
                            Against: {d.against}
                        </p>

                        <p className="muted">
                            Role: {d.role} • {d.date}
                        </p>

                        {/* STATUS */}
                        <span className={`status ${d.status}`}>
                            {d.status}
                        </span>

                        {/* ACTIONS */}
                        <div className="dispute-actions">
                            <button>View</button>
                            <button>Resolve</button>
                            <button>Escalate</button>
                        </div>

                    </div>
                ))}

            </div>

        </div>
    );
}