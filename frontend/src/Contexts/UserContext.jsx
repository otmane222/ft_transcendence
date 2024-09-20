import React, { createContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));

    useEffect(() => {
        // Assuming login stores the token in localStorage
        setAccessToken(localStorage.getItem('accessToken'));
    }, []);

    return (
        <UserContext.Provider value={{ accessToken }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContext;