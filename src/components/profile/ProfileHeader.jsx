import React from "react";

const ProfileHeader = () => {
    return (
        <div className="profile-header">
            <div className="avatar">EH</div>

            <h2>Eddie Harrison</h2>
            <p>eddie.harrison@email.com</p>
            <p>📍 Lagos, Nigeria</p>

            <div className="stats">
                <div>
                    <h4>3</h4>
                    <p>Bookings</p>
                </div>
                <div>
                    <h4>12</h4>
                    <p>Favorites</p>
                </div>
                <div>
                    <h4>5</h4>
                    <p>Reviews</p>
                </div>
                <div>
                    <h4>4</h4>
                    <p>Badges</p>
                </div>
            </div>
        </div>
    );
};

export default ProfileHeader;