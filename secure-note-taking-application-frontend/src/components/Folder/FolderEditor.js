import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import folderService from '../../services/folderService';

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
`;

const EditorContainer = styled.div`
    max-width: 600px;
    margin: 20px auto;
    padding: 30px;
    background: rgba(30, 41, 59, 0.95);
    backdrop-filter: blur(20px);
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0, 255, 255, 0.1);
    border: 1px solid rgba(0, 255, 255, 0.1);
`;

const Input = styled.input`
    width: 100%;
    padding: 15px;
    background: rgba(15, 23, 42, 0.8);
    border: 2px solid rgba(0, 255, 255, 0.1);
    border-radius: 12px;
    color: #ffffff;
    font-size: 1rem;
    transition: all 0.3s ease;

    &:focus {
        border-color: rgba(0, 255, 255, 0.5);
        box-shadow: 0 0 0 2px rgba(0, 255, 255, 0.1);
        outline: none;
    }

    &::placeholder {
        color: rgba(255, 255, 255, 0.5);
    }
`;

const Button = styled.button`
    padding: 12px 24px;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    
    ${props => props.primary ? `
        background: linear-gradient(45deg, #00c9ff, #92fe9d);
        color: white;
        &:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0, 201, 255, 0.3);
        }
    ` : `
        background: rgba(0, 255, 255, 0.1);
        color: #00ffff;
        border: 1px solid rgba(0, 255, 255, 0.2);
        &:hover {
            background: rgba(0, 255, 255, 0.2);
            transform: translateY(-2px);
        }
    `}
`;

const Title = styled.h2`
    color: #ffffff;
    margin: 20px 0;
    font-size: 1.8rem;
    font-weight: 500;
    text-align: center;
`;

const ErrorMessage = styled.div`
    background: rgba(255, 82, 82, 0.1);
    color: #ff5252;
    padding: 12px;
    border-radius: 12px;
    font-size: 0.9rem;
    text-align: center;
    border: 1px solid rgba(255, 82, 82, 0.2);
`;

const FolderEditor = ({ folderId, onFolderSaved }) => {
    const [folderName, setFolderName] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchFolder = async () => {
            if (folderId) {
                try {
                    const response = await folderService.getAllFolders();
                    const folder = response.data.folders.find(f => f.folderId === folderId);
                    if (folder) {
                        setFolderName(folder.folderName);
                    }
                    setError('');
                } catch (error) {
                    console.error('Failed to fetch folder:');
                    setError(error.response?.data?.message || 'Failed to fetch folder:');
                }
            } else {
                setFolderName('');
            }
        };

        fetchFolder();
    }, [folderId]);

    const handleSaveFolder = async (e) => {
        e.preventDefault();
        setError('');
        try {
            if (folderId) {
                await folderService.updateFolder(folderId, folderName);
            } else {
                await folderService.createFolder(folderName);
            }
            onFolderSaved();
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to save folder. Please try again.');
            console.error('Failed to save folder:', error);
        }
    };

    const handleBack = () => {
        onFolderSaved(); // This will return to the folder list
    };

    return (
        <EditorContainer>
            <Button onClick={handleBack}>
                ← Back
            </Button>
            <Title>{folderId ? 'Update Folder Name' : 'Create New Folder'}</Title>
            <StyledForm onSubmit={handleSaveFolder}>
                <Input
                    type="text"
                    value={folderName}
                    onChange={(e) => setFolderName(e.target.value)}
                    placeholder="Enter folder name"
                    required
                    autoFocus
                />
                <Button type="submit" primary>
                    {folderId ? 'Update Folder' : 'Create Folder'}
                </Button>
                {error && <ErrorMessage>{error}</ErrorMessage>}
            </StyledForm>
        </EditorContainer>
    );
};

export default FolderEditor;