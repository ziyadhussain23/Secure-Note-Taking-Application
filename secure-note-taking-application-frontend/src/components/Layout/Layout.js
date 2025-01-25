import React, { useState } from 'react';
import FolderList from '../Folder/FolderList';
import FolderEditor from '../Folder/FolderEditor';
import NoteList from '../Note/NoteList';
import NoteEditor from '../Note/NoteEditor';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    height: 100vh;
    overflow-y: auto;
    position: fixed;
    top: 56px;
    left: 500px; /* Adjusted to leave space for FolderList */
    right: 0;
`;

const MainContent = styled.div`
    flex: 1;
    padding: 56px;
    overflow-y: auto;
    background: rgba(30, 41, 59, 0.95);
    backdrop-filter: blur(20px);
`;

const Layout = () => {
    const [selectedFolderId, setSelectedFolderId] = useState(null);
    const [isCreatingFolder, setIsCreatingFolder] = useState(false);
    const [selectedNoteId, setSelectedNoteId] = useState(null);
    const [isCreatingNote, setIsCreatingNote] = useState(false);
    const [refresh, setRefresh] = useState(false); // State to trigger refresh

    const handleEditFolder = (folderId) => {
        setSelectedFolderId(folderId);
        setIsCreatingFolder(true);
    };

    const handleCreateFolder = () => {
        setSelectedFolderId(null);
        setIsCreatingFolder(true);
    };

    const handleFolderSaved = () => {
        setSelectedFolderId(null);
        setIsCreatingFolder(false);
        setRefresh(!refresh); // Trigger refresh
    };

    const handleEditNote = (noteId) => {
        setSelectedNoteId(noteId);
        setIsCreatingNote(false);
    };

    const handleCreateNote = () => {
        setSelectedNoteId(null);
        setIsCreatingNote(true);
    };

    const handleNoteSaved = () => {
        setSelectedNoteId(null);
        setIsCreatingNote(false);
        setRefresh(!refresh); // Trigger refresh
    };

    const handleSelectFolder = (folderId) => {
        setSelectedFolderId(folderId);
        setSelectedNoteId(null);
        setIsCreatingFolder(false);
        setIsCreatingNote(false);
    };

    return (
        <>
            <FolderList 
                onEditFolder={handleEditFolder} 
                onCreateFolder={handleCreateFolder} 
                onSelectFolder={handleSelectFolder} 
                refresh={refresh} // Pass refresh state
            />
            <Container>
                {selectedFolderId && !isCreatingFolder && (
                    <NoteList
                        folderId={selectedFolderId}
                        onEditNote={handleEditNote}
                        onCreateNote={handleCreateNote}
                        onSelectNote={handleEditNote} 
                        refresh={refresh} // Pass refresh state
                    />
                )}
                <MainContent>
                    {isCreatingFolder ? (
                        <FolderEditor
                            folderId={selectedFolderId}
                            onFolderSaved={handleFolderSaved}
                        />
                    ) : isCreatingNote || selectedNoteId ? (
                        <NoteEditor
                            noteId={selectedNoteId}
                            folderId={selectedFolderId} // Pass folderId to NoteEditor
                            onNoteSaved={handleNoteSaved}
                            key={selectedNoteId || 'new'}
                        />
                    ) : (
                        <div>Select a folder or note to edit or create a new one.</div>
                    )}
                </MainContent>
            </Container>
        </>
    );
};

export default Layout;