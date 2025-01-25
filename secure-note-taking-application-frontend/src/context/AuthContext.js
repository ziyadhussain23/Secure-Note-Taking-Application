import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import Cookies from 'js-cookie';

// Define initial state
const defaultAuthState = {
    isAuthenticated: false,
    error: null,
    login: async () => {},
    logout: async () => {}
};

// Create context with default state
const AuthContext = createContext(defaultAuthState);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(defaultAuthState.isAuthenticated);
    const [error, setError] = useState(defaultAuthState.error);
    const navigate = useNavigate();

    // Check auth status on mount
    useEffect(() => {
        const checkAuth = () => {
            const token = Cookies.get('SecureNoteTakingApplication');
            if (token) {
                setIsAuthenticated(true);
            } else {
                console.log('No token found');
            }
        };
        checkAuth();
    }, []);

    const login = async (username, password) => {
        try {
            const response = await authService.login(username, password);
            if (response.token) {
                Cookies.set('SecureNoteTakingApplication', response.token, {
                    secure: true,
                    sameSite: 'strict'
                });
                setIsAuthenticated(true);
                setError(null);
                navigate('/folders');
            } else {
                console.log('No token in response');
            }
        } catch (error) {
            setIsAuthenticated(false);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await authService.logout();
        } finally {
            Cookies.remove('SecureNoteTakingApplication');
            setIsAuthenticated(false);
            setError(null);
            navigate('/login');
        }
    };

    // Create context value object
    const contextValue = {
        isAuthenticated,
        error,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook with error checking
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export default AuthContext;