import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const getNotesInFolder = (folderId, pageNumber, pageSize, sortBy, sortOrder) => {
    return axios.get(`${API_URL}/${folderId}/notes`, {
        params: { pageNumber, pageSize, sortBy, sortOrder },
        withCredentials: true
    });
};

const getNoteById = (noteId) => {
    return axios.get(`${API_URL}/note/${noteId}`, { withCredentials: true });
};

const createNoteInFolder = (folderId, title, content) => {
    return axios.post(`${API_URL}/${folderId}/note/create`, { title, content }, { withCredentials: true });
};

const updateNoteFromFolder = (folderId, noteId, title, content) => {
    return axios.put(`${API_URL}/${folderId}/note/update/${noteId}`, { title, content }, { withCredentials: true });
};

const deleteNotesFromFolder = (folderId, noteId) => {
    return axios.delete(`${API_URL}/${folderId}/note/delete/${noteId}`, { withCredentials: true });
};

const noteService = {
    getNotesInFolder,
    getNoteById,
    createNoteInFolder,
    updateNoteFromFolder,
    deleteNotesFromFolder
};

export default noteService;