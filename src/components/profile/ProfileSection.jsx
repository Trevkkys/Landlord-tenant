import React from "react";
import ProfileItem from "./ProfileItem";

const ProfileSection = () => {
    return (
        <div className="profile-sections">

            <h3>My Activity</h3>
            <ProfileItem label="My Bookings" icon="📅" />
            <ProfileItem label="Saved Properties" icon="❤️" />
            <ProfileItem label="KYC Verification" icon="🛡️" value="Tier 1" />

            <h3>Account</h3>
            <ProfileItem label="Edit Profile" icon="👤" />
            <ProfileItem label="Change Password" icon="🔒" />
            <ProfileItem label="Notifications" icon="🔔" toggle />

            <h3>Preferences</h3>
            <ProfileItem label="Language" icon="🌐" value="English" />
            <ProfileItem label="Currency" icon="💱" value="NGN" />
            <ProfileItem label="Dark Mode" icon="🌙" toggle />

            <h3>Support</h3>
            <ProfileItem label="Help & FAQ" icon="❓" />
            <ProfileItem label="Privacy Policy" icon="📄" />
            <ProfileItem label="Rate App" icon="⭐" />

        </div>
    );
};

export default ProfileSection;