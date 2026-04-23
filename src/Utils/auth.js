export const getUser = () => {
    try {
        const raw = localStorage.getItem("vitRentUser");
        return raw ? JSON.parse(raw) : null;
    } catch (e) {
        return null;
    }
};

export const isLoggedIn = () => {
    const user = getUser();
    return !!(
        user &&
        typeof user.email === "string" &&
        user.email.trim() !== "" &&
        typeof user.role === "string" &&
        user.role.trim() !== ""
    );
};

export const getRole = () => {
    const user = getUser();
    return user?.role?.toLowerCase() || null;
};