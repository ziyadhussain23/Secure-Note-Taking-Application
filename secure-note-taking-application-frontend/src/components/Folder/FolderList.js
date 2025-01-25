import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import folderService from '../../services/folderService';

const fadeIn = keyframes`
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

const Sidebar = styled.div`
    width: 250px;
    background: rgba(30, 41, 59, 0.95);
    backdrop-filter: blur(20px);
    padding: 20px;
    overflow-y: auto;
    position: fixed;
    top: 56px;
    left: 0;
    height: 100%;
    padding-bottom: 80px;
`;

const FolderCard = styled.div`
    background: rgba(30, 41, 59, 0.95);
    backdrop-filter: blur(20px);
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 8px 32px rgba(0, 255, 255, 0.1);
    border: 1px solid rgba(0, 255, 255, 0.1);
    transition: all 0.3s ease;
    display: flex;
    justify-content: space-between;
    align-items: center;
    animation: ${fadeIn} 0.5s ease-in-out;
    margin-bottom: 5px;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 12px 40px rgba(0, 255, 255, 0.2);
        border-color: rgba(0, 255, 255, 0.3);
    }
`;

const FolderTitle = styled.h3`
    margin: 0;
    color: #ffffff;
    font-size: 1.3rem;
`;

const ActionButtons = styled.div`
    display: flex;
    gap: 10px;
`;

const IconButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px;
    background: rgba(0, 255, 255, 0.1);
    color: #00ffff;
    border: 1px solid rgba(0, 255, 255, 0.2);
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        background: rgba(0, 255, 255, 0.2);
        transform: translateY(-2px);
    }
`;

const CreateButton = styled.button`
    position: sticky;
    bottom: 0%;
    left: 200px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: linear-gradient(45deg, #6e8efb, #a777e3);
    color: white;
    border: none;
    cursor: pointer;
    box-shadow: 0 4px 15px rgba(0, 201, 255, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    animation: ${fadeIn} 0.5s ease-in-out;
    transition: all 0.3s ease;
    
    &:hover {
        background: linear-gradient(45deg, #00b4e6, #7fe48c);
        transform: translateY(-5px);
        box-shadow: 0 6px 20px rgba(0, 201, 255, 0.3);
    }
`;

const FolderList = ({ onEditFolder, onCreateFolder, onSelectFolder, refresh }) => {
    const [folders, setFolders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchFolders();
    }, [refresh]);

    const fetchFolders = async () => {
        try {
            setIsLoading(true);
            const response = await folderService.getAllFolders(0, 100, 'folderName', 'asc');
            setFolders(response.data.folders);
            setError('');
        } catch (error) {
            console.error('Error fetching folders:', error);
            setError(error.response?.data?.message || 'No Folder Created Till Now');
            toast.error('Failed to load folders', {
                icon: false, // Remove the default icon
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteFolder = async (folderId) => {
        if (window.confirm('Are you sure you want to delete this folder?')) {
            try {
                await folderService.deleteFolder(folderId);
                toast.success('Folder deleted successfully', {
                    icon: false, // Remove the default icon
                });
                window.location.reload();
                fetchFolders();
            } catch (error) {
                console.error('Error deleting folder:', error);
                toast.error('Failed to delete folder', {
                    icon: false, // Remove the default icon
                });
            }
        }
    };

    if (isLoading) {
        return <div>Select a folder or note to edit or create a new one.</div>;
    }

    return (
        <Sidebar>
            <h2>My Folders</h2>
            {error && <div style={{ color: 'red', marginBottom: '20px' }}>{error}</div>}
            <>
                {folders.map(folder => (
                    <FolderCard key={folder.folderId} onClick={() => onSelectFolder(folder.folderId)}>
                        <Link to={`/folders/${folder.folderId}/notes`}>
                            <FolderTitle>{folder.folderName}</FolderTitle>
                        </Link>
                        <ActionButtons>
                            <IconButton 
                                variant="edit" 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onEditFolder(folder.folderId);
                                }}
                            >
                                <FontAwesomeIcon icon={faEdit} />
                            </IconButton>
                            <IconButton 
                                variant="delete" 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteFolder(folder.folderId);
                                }}
                            >
                                <FontAwesomeIcon icon={faTrash} />
                            </IconButton>
                        </ActionButtons>
                    </FolderCard>
                ))}
                <CreateButton onClick={onCreateFolder}>
                    <FontAwesomeIcon icon={faPlus} />
                </CreateButton>
            </>
        </Sidebar>
    );
};

export default FolderList;