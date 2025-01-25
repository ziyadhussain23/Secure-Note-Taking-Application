import React, { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import './Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(''); // Add state for error message
    const { login, error } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage(''); // Clear previous error message
        try {
            await login(username, password);
        }catch(error){
            setErrorMessage(error.response?.data?.message || 'Invalid username or password');          
        }
        finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                                <div className="logo">
                    <img src={process.env.PUBLIC_URL + 'logo.png'} 
                         alt="Logo"
                         onError={(e) => {
                             e.target.onerror = null;
                             e.target.src = process.env.PUBLIC_URL + '/favicon.ico';
                         }}
                    />
                </div>
                <h2 className="login-title">Welcome Back</h2>
                {error && <p className="error-message">{error}</p>}
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <form onSubmit={handleLogin} className="login-form">
                    <div className="form-group">
                        <FaUser className="input-icon" />
                        <input 
                            type="text" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                            placeholder="Username" 
                            required 
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <FaLock className="input-icon" />
                        <input 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            placeholder="Password" 
                            required 
                            className="form-input"
                        />
                    </div>
                    <div className="form-options">
                        <label className="remember-me">
                            <input type="checkbox" /> Remember me
                        </label>
                        <a href="/forgot-password" className="forgot-password">
                            Forgot Password?
                        </a>
                    </div>
                    <button 
                        type="submit" 
                        className={`login-button ${isLoading ? 'loading' : ''}`}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;