import { useState } from "react";

export default function useUser() {

    const getUser = () => {
        return JSON.parse(localStorage.getItem("vitUser"));
    };

    const [user, setUser] = useState(getUser());

    const updateUser = (data) => {
        localStorage.setItem("vitUser", JSON.stringify(data));
        setUser(data);
    };

    return { user, updateUser };
}