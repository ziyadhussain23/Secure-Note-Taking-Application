import React, { useState } from 'react';
import { FaUser, FaLock, FaEnvelope, FaUserCircle } from 'react-icons/fa';
import authService from '../../services/authService';
import './Signup.css';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSignup = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        if (password.length < 8) {
            setError('Password must be at least 8 characters long.');
            setIsLoading(false);
            return;
        }
        try {
            await authService.signup(username, password, email, firstName, lastName);
            setSuccess('Signup successful! Please login.');
            setError('');
        } catch (error) {
            setError(error.response?.data?.message  || 'Signup failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-box">
                <div className="logo">
                    <img src={process.env.PUBLIC_URL + '/logo.png'} 
                         alt="Logo"
                         onError={(e) => {
                             e.target.onerror = null;
                             e.target.src = process.env.PUBLIC_URL + '/favicon.ico';
                         }}
                    />
                </div>
                <h2 className="signup-title">Create Account</h2>
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}
                <form onSubmit={handleSignup} className="signup-form">
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
                    <div className="form-group">
                        <FaEnvelope className="input-icon" />
                        <input 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            placeholder="Email" 
                            required 
                            className="form-input"
                        />
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <FaUserCircle className="input-icon" />
                            <input 
                                type="text" 
                                value={firstName} 
                                onChange={(e) => setFirstName(e.target.value)} 
                                placeholder="First Name" 
                                required 
                                className="form-input"
                            />
                        </div>
                        <div className="form-group">
                            <FaUserCircle className="input-icon" />
                            <input 
                                type="text" 
                                value={lastName} 
                                onChange={(e) => setLastName(e.target.value)} 
                                placeholder="Last Name" 
                                className="form-input"
                            />
                        </div>
                    </div>
                    <button 
                        type="submit" 
                        className={`signup-button ${isLoading ? 'loading' : ''}`}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Creating Account...' : 'Sign Up'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Signup;