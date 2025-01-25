import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';

const Signout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const signoutUser = async () => {
            if (window.confirm('Are you sure you want sign Out?')) {
                try {
                    await authService.logout();
                    navigate('/login');
                } catch (error) {
                    console.error('Failed to sign out', error);
                }
            }
        };

        signoutUser();
    }, [navigate]);

    return (
        <div>
            <h2>Signing out...</h2>
        </div>
    );
};

export default Signout;