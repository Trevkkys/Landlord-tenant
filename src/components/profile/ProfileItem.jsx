import React from "react";

const ProfileItem = ({ icon, label, value, toggle }) => {
    return (
        <div className="profile-item">

            <div className="left">
                <span className="icon">{icon}</span>
                <span>{label}</span>
            </div>

            <div className="right">
                {value && <span className="value">{value}</span>}
                {toggle && <input type="checkbox" />}
                {!toggle && !value && <span>›</span>}
            </div>

        </div>
    );
};

export default ProfileItem;