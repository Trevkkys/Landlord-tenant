import React from "react";

const badges = [
    { emoji: "✅", label: "100% Payment" },
    { emoji: "🔥", label: "Active User" },
    { emoji: "🌟", label: "Top Rated" },
    { emoji: "⚡", label: "Fast Responder" }
];

const ProfileBadgeRow = () => {
    return (
        <div className="badge-row">
            {badges.map((b, i) => (
                <div key={i} className="badge">
                    <span>{b.emoji}</span>
                    <p>{b.label}</p>
                </div>
            ))}
        </div>
    );
};

export default ProfileBadgeRow;