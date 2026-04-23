import { useNavigate, useLocation } from "react-router-dom";

export default function BackToDashboard({ role }) {
    const navigate = useNavigate();
    const location = useLocation();

    let user = JSON.parse(localStorage.getItem("vitRentUser"));

    const isLoggedIn = user && user.email;

    // detect if coming from dashboard flow
    const fromDashboard =
        location.pathname.includes("/landlord") ||
        location.pathname.includes("/agent") ||
        location.pathname.includes("/admin");

    if (!isLoggedIn || !fromDashboard) return null;

    const getDashboardRoute = () => {
        if (role === "landlord") return "/landlord";
        if (role === "agent") return "/agent";
        return "/admin/dashboard";
    };

    return (
        <div className="admin-footer-action">
            <button
                className="back-desktop-btn"
                onClick={() => navigate(getDashboardRoute())}
            >
                ← Back to Dashboard
            </button>
        </div>
    );
}