import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = process.env.REACT_APP_API_URL;

const getAuthHeader = () => {
    const token = Cookies.get('SecureNoteTakingApplication');
    if (token) {
        return { Authorization: token };
    } else {
        return {};
    }
};

const getAllFolders = (pageNumber, pageSize, sortBy, sortOrder) => {
    const token = Cookies.get('SecureNoteTakingApplication');
    return axios.get(`${API_URL}/folder/get`, {
        params: { pageNumber, pageSize, sortBy, sortOrder },
        headers: { 
            Authorization: token 
        },
        withCredentials: true
    });
};

const getFolder = (folderId) => {
    return axios.get(`${API_URL}/folder/${folderId}`, { headers: getAuthHeader(), withCredentials: true });
};

const createFolder = (folderName) => {
    return axios.post(`${API_URL}/folder/create`, { folderName }, { headers: getAuthHeader(), withCredentials: true });
};

const updateFolder = (folderId, folderName) => {
    return axios.put(`${API_URL}/folder/update/${folderId}`, { folderName }, { headers: getAuthHeader(), withCredentials: true });
};

const deleteFolder = (folderId) => {
    return axios.delete(`${API_URL}/folder/delete/${folderId}`, { headers: getAuthHeader(), withCredentials: true });
};

const folderService = { getAllFolders, getFolder, createFolder, updateFolder, deleteFolder };

export default folderService;