import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    CartesianGrid,
    Legend
} from "recharts";

export default function AdminTransactions() {
    const [filter, setFilter] = useState("all");
    const navigate = useNavigate();

    // TRANSACTIONS
    const transactions = [
        {
            id: 1,
            user: "Mr Onoja",
            amount: "₦500,000",
            status: "escrow",
            type: "rent payment",
            date: "Apr 2026"
        },
        {
            id: 2,
            user: "Mr Leo",
            amount: "₦1,200,000",
            status: "completed",
            type: "rent payment",
            date: "Apr 2026"
        },
        {
            id: 3,
            user: "Mr Aliyu",
            amount: "₦300,000",
            status: "pending",
            type: "deposit",
            date: "Apr 2026"
        }
    ];

    const filtered = transactions.filter((t) => {
        return filter === "all" || t.status === filter;
    });

    // LINE CHART (VOLUME)
    const chartData = [
        { month: "Jan", value: 1200000 },
        { month: "Feb", value: 1800000 },
        { month: "Mar", value: 1400000 },
        { month: "Apr", value: 2200000 },
        { month: "May", value: 2600000 }
    ];

    // BAR CHART (TRANSACTION TYPES)
    const typeData = [
        { name: "Rent", value: 8 },
        { name: "Deposits", value: 3 },
        { name: "Other", value: 2 }
    ];

    // PIE CHART (STATUS)
    const statusData = [
        { name: "Completed", value: 8 },
        { name: "Escrow", value: 3 },
        { name: "Pending", value: 2 }
    ];

    const COLORS = ["#8b0000", "#d9534f", "#f0ad4e"];

    return (
        <div className="admin-page">

            {/* HEADER */}
            <div className="admin-page-header">
                <h2>Admin Analytics & Transaction Control</h2>
                <p className="muted">Monitor platform-wide financial activity</p>
            </div>

            {/* KPI CARDS */}
            <div className="admin-stats">

                <div className="admin-card highlight">
                    <h4>Total Volume</h4>
                    <p>₦12.5M</p>
                </div>

                <div className="admin-card">
                    <h4>In Escrow 🔒</h4>
                    <p>₦3.2M</p>
                </div>

                <div className="admin-card">
                    <h4>Completed</h4>
                    <p>₦8.1M</p>
                </div>

                <div className="admin-card">
                    <h4>Pending</h4>
                    <p>₦1.2M</p>
                </div>

            </div>

            {/* CHART GRID */}
            <div className="admin-charts">

                {/* LINE CHART */}
                <div className="chart-box">
                    <h3>Transaction Volume Trend</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Line
                                type="monotone"
                                dataKey="value"
                                stroke="#8b0000"
                                strokeWidth={3}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* BAR CHART */}
                <div className="chart-box">
                    <h3>Transaction Types</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={typeData}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="value" fill="#8b0000" radius={[6, 6, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* PIE CHART */}
                <div className="chart-box full-width">
                    <h3>Status Distribution</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie data={statusData} dataKey="value" outerRadius={90}>
                                {statusData.map((_, i) => (
                                    <Cell key={i} fill={COLORS[i]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

            </div>

            {/* FILTERS */}
            <div className="user-filters">
                <button onClick={() => setFilter("all")}>All</button>
                <button onClick={() => setFilter("escrow")}>Escrow</button>
                <button onClick={() => setFilter("completed")}>Completed</button>
                <button onClick={() => setFilter("pending")}>Pending</button>
            </div>

            {/* TRANSACTIONS */}
            <div className="transaction-list">
                {filtered.map((t) => (
                    <div key={t.id} className="transaction-card">

                        <div>
                            <h4>{t.user}</h4>
                            <p className="muted">{t.type}</p>
                        </div>

                        <div>
                            <p className="amount">{t.amount}</p>
                            <p className="muted">{t.date}</p>
                        </div>

                        <span className={`status ${t.status}`}>
                            {t.status}
                        </span>

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