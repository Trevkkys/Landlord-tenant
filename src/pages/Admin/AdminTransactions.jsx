import React, { useState } from "react";
import "./Admin.css";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from "recharts";

export default function AdminTransactions() {
    const [filter, setFilter] = useState("all");

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

    const chartData = [
        { month: "Jan", value: 1200000 },
        { month: "Feb", value: 1800000 },
        { month: "Mar", value: 1400000 },
        { month: "Apr", value: 2200000 },
        { month: "May", value: 2600000 },
    ];

    return (
        <div className="admin-page">

            {/* HEADER */}
            <div className="admin-page-header">
                <h2>Transaction Control Center</h2>
            </div>

            {/* KPI CARDS */}
            <div className="admin-stats">

                <div className="admin-card">
                    <h4>Total Volume</h4>
                    <p>₦12.5M</p>
                </div>

                <div className="chart-box">

                    <h3>Transaction Volume Overview</h3>

                    <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={chartData}>
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

            {/* FILTERS */}
            <div className="user-filters">
                <button onClick={() => setFilter("all")}>All</button>
                <button onClick={() => setFilter("escrow")}>Escrow</button>
                <button onClick={() => setFilter("completed")}>Completed</button>
                <button onClick={() => setFilter("pending")}>Pending</button>
            </div>

            {/* TRANSACTION LIST */}
            <div className="transaction-list">

                {filtered.map((t) => (
                    <div key={t.id} className="transaction-card">

                        {/* LEFT */}
                        <div>
                            <h4>{t.user}</h4>
                            <p className="muted">{t.type}</p>
                        </div>

                        {/* MIDDLE */}
                        <div>
                            <p className="amount">{t.amount}</p>
                            <p className="muted">{t.date}</p>
                        </div>

                        {/* STATUS */}
                        <span className={`status ${t.status}`}>
                            {t.status}
                        </span>

                    </div>
                ))}

            </div>

        </div>
    );
}