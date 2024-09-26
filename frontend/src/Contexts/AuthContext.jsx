import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();
export const AuthContextHandler = createContext(null)

export const AuthProvider = ({ children, accessToken, tokenHandler }) => {

    return (
        <AuthContext.Provider value={accessToken}>
            <AuthContextHandler.Provider value={tokenHandler}>
                {children}
            </AuthContextHandler.Provider>
        </AuthContext.Provider>
    );
}

export default AuthProvider;
