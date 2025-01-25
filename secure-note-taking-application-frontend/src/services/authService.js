import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = process.env.REACT_APP_API_URL;

const getToken = () => {
    return Cookies.get('SecureNoteTakingApplication');
};

const login = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, { username, password }, { withCredentials: true });
        if (response.data.token) {
            Cookies.set('SecureNoteTakingApplication', response.data.token, { expires: 1, sameSite: 'Strict' });
        } else {
            console.log('No token in login response');
        }
        return response.data;
    } catch (error) {
        throw error;
    }
};

const signup = async (username, password, email, firstName, lastName) => {
    try {
        const response = await axios.post(`${API_URL}/auth/signup`, { username, password, email, firstName, lastName }, { withCredentials: true });
        return response.data;
    } catch (error) {
        throw error;
    }
};

const logout = async () => {
    try {
        await axios.post(`${API_URL}/auth/logout`, {}, { withCredentials: true });
        Cookies.remove('SecureNoteTakingApplication');
    } catch (error) {
        throw error;
    }
};

const authService = { login, signup, logout, getToken };

export default authService;