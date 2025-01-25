import React, { useState, useEffect } from 'react';
import folderService from '../../services/folderService';

const FolderForm = ({ folderId, onFolderSaved }) => {
    const [folderName, setFolderName] = useState('');

    useEffect(() => {
        if (folderId) {
            const fetchFolder = async () => {
                try {
                    const response = await folderService.getFolder(folderId);
                    setFolderName(response.data.folderName);
                } catch (error) {
                    console.error('Failed to fetch folder', error);
                }
            };
            fetchFolder();
        }
    }, [folderId]);

    const handleSaveFolder = async (e) => {
        e.preventDefault();
        try {
            if (folderId) {
                await folderService.updateFolder(folderId, folderName);
            } else {
                await folderService.createFolder(folderName);
            }
            setFolderName('');
            onFolderSaved();
        } catch (error) {
            console.error('Failed to save folder', error);
        }
    };

    return (
        <form onSubmit={handleSaveFolder}>
            <input
                type="text"
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
                placeholder="Folder Name"
                required
            />
            <button type="submit">{folderId ? 'Update Folder' : 'Create Folder'}</button>
        </form>
    );
};

export default FolderForm;