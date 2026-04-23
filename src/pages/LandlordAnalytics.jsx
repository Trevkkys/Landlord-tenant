import { useNavigate } from "react-router-dom";
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, LineChart, Line, CartesianGrid, Legend
} from "recharts";

export default function LandlordAnalytics() {
    const navigate = useNavigate();

    // MOCK DATA
    const revenueData = [
        { month: "Jan", revenue: 400000 },
        { month: "Feb", revenue: 300000 },
        { month: "Mar", revenue: 500000 },
        { month: "Apr", revenue: 450000 },
        { month: "May", revenue: 600000 },
    ];

    const occupancyData = [
        { name: "Occupied", value: 9 },
        { name: "Vacant", value: 3 },
    ];

    const propertyGrowth = [
        { month: "Jan", properties: 5 },
        { month: "Feb", properties: 7 },
        { month: "Mar", properties: 9 },
        { month: "Apr", properties: 12 },
    ];

    const COLORS = ["#069494", "#ff6b6b"];

    return (
        <div className="analytics-page">
            <h1>Landlord Analytics</h1>

            {/* SUMMARY */}
            <div className="analytics-grid">
                <div className="card">Total Properties <h2>12</h2></div>
                <div className="card">Occupied <h2>9</h2></div>
                <div className="card">Vacant <h2>3</h2></div>
                <div className="card">Monthly Revenue <h2>₦600K</h2></div>
            </div>

            {/* CHARTS */}
            <div className="charts-grid">

                {/* BAR CHART */}
                <div className="chart-card">
                    <h3>Monthly Revenue</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={revenueData}>
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="revenue" fill="#069494" radius={[6, 6, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* PIE CHART */}
                <div className="chart-card">
                    <h3>Occupancy Rate</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie data={occupancyData} dataKey="value" outerRadius={80}>
                                {occupancyData.map((_, i) => (
                                    <Cell key={i} fill={COLORS[i]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* LINE CHART */}
                <div className="chart-card full-width">
                    <h3>Property Growth</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={propertyGrowth}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="properties" stroke="#069494" strokeWidth={3} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

            </div>

            {/* TABLE */}
            <div className="table-card">
                <h3>Property Performance</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Property</th>
                            <th>Location</th>
                            <th>Status</th>
                            <th>Rent</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>2 Bed Apartment</td>
                            <td>Lekki</td>
                            <td className="green">Occupied</td>
                            <td>₦450,000</td>
                        </tr>
                        <tr>
                            <td>Self Contain</td>
                            <td>Yaba</td>
                            <td className="red">Vacant</td>
                            <td>₦250,000</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <button className="back-btn" onClick={() => navigate("/landlord")}>
                Back to Dashboard
            </button>
        </div>
    );
}