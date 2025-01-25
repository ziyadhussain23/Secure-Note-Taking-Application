import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Login from '../Auth/Login';
import Signup from '../Auth/Signup';
import FolderForm from '../Folder/FolderForm';
import Layout from '../Layout/Layout';

const AppRoutes = () => {
    const { isAuthenticated } = useAuth();

    return (
        <Routes>
            <Route path="/" element={isAuthenticated ? <Navigate to="/folders" /> : <Navigate to="/login" />} />
            <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/folders" />} />
            <Route path="/signup" element={!isAuthenticated ? <Signup /> : <Navigate to="/folders" />} />
            <Route path="/folders" element={isAuthenticated ? <Layout /> : <Navigate to="/login" />} />
            <Route path="/folders/new" element={isAuthenticated ? <FolderForm /> : <Navigate to="/login" />} />
            <Route path="/folders/:folderId/notes" element={isAuthenticated ? <Layout /> : <Navigate to="/login" />} />
        </Routes>
    );
};

export default AppRoutes;