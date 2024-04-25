import axios from "axios";
import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {

    const [user, setUser] = useState(null);

    const handleProfile = async () => {
        try {
            const { data } = await axios.get("http://localhost:4000/profile");
            setUser(data);
        } catch (error) {
            console.error("Error fetching profile:", error);
        }
    };

    useEffect(() => {
        if (!user) {
            handleProfile();
        }
    }, [user]); // Add user to the dependencies array to prevent infinite loop

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}
