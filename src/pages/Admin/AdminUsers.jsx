import React, { useState } from "react";
import "./Admin.css";
import { useNavigate } from "react-router-dom";

export default function AdminUsers() {
    const [filter, setFilter] = useState("all");
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const [users, setUsers] = useState([
        { id: 1, name: "Mr Onoja", role: "Tenant", status: "active", joined: "Joined Jan 2026" },
        { id: 2, name: "Mr Joe", role: "Landlord", status: "suspended", joined: "Joined Feb 2026" },
        { id: 3, name: "Mr Aliyu", role: "Agent", status: "active", joined: "Joined Mar 2026" },
        { id: 4, name: "Mr Chidi", role: "Tenant", status: "active", joined: "Joined Apr 2026" },
    ]);

    // FILTER LOGIC
    const filteredUsers = users.filter((u) => {
        const matchesFilter = filter === "all" || u.status === filter;
        const matchesSearch = u.name.toLowerCase().includes(search.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    // ACTIONS
    const suspendUser = (id) => {
        setUsers((prev) =>
            prev.map((u) =>
                u.id === id ? { ...u, status: "suspended" } : u
            )
        );
    };

    const banUser = (id) => {
        setUsers((prev) => prev.filter((u) => u.id !== id));
    };

    return (
        <div className="admin-page">

            {/* HEADER */}
            <div className="admin-page-header">
                <h2>User Management</h2>

                <input
                    type="text"
                    placeholder="Search users..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="user-search"
                />
            </div>

            {/* FILTERS */}
            <div className="user-filters">
                <button onClick={() => setFilter("all")}>All</button>
                <button onClick={() => setFilter("active")}>Active</button>
                <button onClick={() => setFilter("suspended")}>Suspended</button>
            </div>

            {/* TABLE */}
            <div className="user-table">

                {filteredUsers.map((user) => (
                    <div key={user.id} className="user-row">

                        {/* USER INFO */}
                        <div className="user-info">
                            <div className="avatar">
                                {user.name.charAt(0)}
                            </div>

                            <div>
                                <h4>{user.name}</h4>
                                <p className="muted">{user.role}</p>
                            </div>
                        </div>

                        {/* JOIN DATE */}
                        <p className="muted">{user.joined}</p>

                        {/* STATUS */}
                        <span className={`status ${user.status}`}>
                            {user.status}
                        </span>

                        {/* ACTIONS */}
                        <div className="user-actions">
                            <button>View</button>
                            <button onClick={() => suspendUser(user.id)}>
                                Suspend
                            </button>
                            <button onClick={() => banUser(user.id)}>
                                Ban
                            </button>
                        </div>

                    </div>
                ))}

            </div>

            <div className="admin-top-actions">

                {/* LEFT SIDE - BACK BUTTON */}
                <button
                    className="back-desktop-btn"
                    onClick={() => navigate("/admin/dashboard")}
                >
                    ← Back to Dashboard
                </button>
            </div>
        </div>
    );
}