import { useNavigate } from "react-router-dom";
import {
    LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell
} from "recharts";

export default function AgentAnalytics() {
    const navigate = useNavigate();

    // UPDATED DATA FOR AGENT
    const performanceData = [
        { month: "Jan", deals: 2 },
        { month: "Feb", deals: 4 },
        { month: "Mar", deals: 3 },
        { month: "Apr", deals: 5 },
    ];

    const commissionData = [
        { name: "Rent Deals", value: 70 },
        { name: "Sales Deals", value: 20 },
        { name: "Other", value: 10 },
    ];

    const COLORS = ["#069494", "#ffa94d", "#ff6b6b"];

    return (
        <div className="analytics-page">
            <h1>Agent Analytics</h1>

            {/* SUMMARY */}
            <div className="analytics-grid">
                <div className="card">
                    Listings Managed
                    <h2>24</h2>
                </div>

                <div className="card">
                    Active Listings
                    <h2>18</h2>
                </div>

                <div className="card">
                    Deals Closed
                    <h2>12</h2>
                </div>

                <div className="card">
                    Commission Earned
                    <h2>₦3.2M</h2>
                </div>
            </div>

            {/* CHARTS */}
            <div className="charts-grid">

                {/* DEALS TREND */}
                <div className="chart-card">
                    <h3>Deals Closed Trend</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={performanceData}>
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Line
                                type="monotone"
                                dataKey="deals"
                                stroke="#069494"
                                strokeWidth={3}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* COMMISSION BREAKDOWN */}
                <div className="chart-card">
                    <h3>Commission Breakdown</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie data={commissionData} dataKey="value" outerRadius={80}>
                                {commissionData.map((_, i) => (
                                    <Cell key={i} fill={COLORS[i]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

            </div>

            {/* ACTIVITY */}
            <div className="table-card">
                <h3>Recent Activity</h3>
                <ul className="activity-list">
                    <li>Closed deal for Lekki apartment</li>
                    <li>Listed new property in Abuja</li>
                    <li>Earned commission ₦500,000</li>
                </ul>
            </div>

            {/* BACK BUTTON */}
            <button
                className="back-btn"
                onClick={() => navigate("/agent")}
            >
                Back to Dashboard
            </button>
        </div>
    );
}