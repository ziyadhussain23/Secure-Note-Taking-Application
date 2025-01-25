import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../context/AuthContext';

const Navigation = styled.nav`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 56px;
    background: rgba(30, 41, 59, 0.95);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(0, 255, 255, 0.1);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    display: flex;
    align-items: center;
    padding: 0 2rem;
`;

const NavList = styled.ul`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    list-style: none;
    margin: 0;
    padding: 0;
`;

const NavSection = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
`;

const NavItem = styled.li`
    a {
        color: #ffffff;
        text-decoration: none;
        padding: 0.5rem 1rem;
        border-radius: 8px;
        transition: all 0.3s ease;
        font-weight: 500;
        
        &:hover {
            background: rgba(0, 255, 255, 0.1);
            box-shadow: 0 0 10px rgba(0, 255, 255, 0.1);
        }
    }

    button {
        background: transparent;
        border: 1px solid rgba(0, 255, 255, 0.2);
        color: #ffffff;
        padding: 0.5rem 1rem;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s ease;
        font-weight: 500;

        &:hover {
            background: rgba(0, 255, 255, 0.1);
            border-color: rgba(0, 255, 255, 0.4);
            box-shadow: 0 0 10px rgba(0, 255, 255, 0.1);
        }
    }
`;

const NavigationBar = () => {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <Navigation>
            <NavList>
                <NavSection>
                    {isAuthenticated && (
                        <NavItem>
                            <Link to="/folders">Folders</Link>
                        </NavItem>
                    )}
                </NavSection>
                <NavSection>
                    {!isAuthenticated ? (
                        <>
                            <NavItem>
                                <Link to="/login">Login</Link>
                            </NavItem>
                            <NavItem>
                                <Link to="/signup">Sign Up</Link>
                            </NavItem>
                        </>
                    ) : (
                        <NavItem>
                            <Link to="#" onClick={handleLogout}>Sign Out</Link>
                        </NavItem>
                    )}
                </NavSection>
            </NavList>
        </Navigation>
    );
};

export default NavigationBar;