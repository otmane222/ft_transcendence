import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios'; // Ensure axios is imported

// Create a new context for the token
export const TokenContext = createContext();

// Create a provider component
export const TokenProvider = ({ children }) => {
    const [token, setToken] = useState(() => localStorage.getItem('accessToken'));

    const refreshAccessToken = async () => {
        console.log("Refreshing access token");
        const refreshToken = localStorage.getItem('refreshToken');
        try {
            const response = await axios.post('http://localhost:8000/auth/refresh/', {
                refresh: refreshToken,
            });
            const { access } = response.data;
            localStorage.setItem('accessToken', access);
            setToken(access); // Update the state with the new token
        } catch (error) {
            console.error('Error refreshing token:', error);
            // Handle token refresh failure (e.g., clear tokens and redirect to login)
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            setToken(null); // Clear the token state
        }
    };

    useEffect(() => {
        const tokenRefreshInterval = setInterval(() => {
            if (token) {
                refreshAccessToken(); // Refresh token periodically if it exists
            }
        }, 5 * 60 * 1000); // Refresh every 15 minutes (adjust as needed)

        return () => clearInterval(tokenRefreshInterval); // Cleanup on unmount
    }, [token]);

    // Optionally, you can create a login function to set the token when a user logs in


    return (
        <TokenContext.Provider value={{ token, refreshAccessToken}}>
            {children}
        </TokenContext.Provider>
    );
};

export default TokenProvider;