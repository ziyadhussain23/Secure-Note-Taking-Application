import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import noteService from '../../services/noteService';
import {keyframes} from "styled-components";
import folderService from "../../services/folderService";

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
    left: 250px; /* Adjusted to be next to FolderList */
    height: 100%;
    padding-bottom: 80px;
`;

const NoteCard = styled.div`
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

const NoteTitle = styled.h3`
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
    bottom: 20px;
    margin-left: auto;
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
    transition: all 0.3s ease;
    animation: ${fadeIn} 0.5s ease-in-out;
    
    &:hover {
        background: linear-gradient(45deg, #00b4e6, #7fe48c);
        transform: translateY(-5px);
        box-shadow: 0 6px 20px rgba(0, 201, 255, 0.3);
    }
`;

const NoteList = ({ folderId, onEditNote, onCreateNote, onSelectNote, refresh }) => {
    const [notes, setNotes] = useState([]);
    const [folderName, setFolderName] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchNotes = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await noteService.getNotesInFolder(folderId, 0, 100, 'noteTitle', 'asc');
            if (response.data && response.data.notes) {
                setNotes(response.data.notes);
            } else {
                console.log('No notes found in response:', response.data);
                setNotes([]);
            }
            setError('');
        } catch (error) {
            console.error('Error fetching notes:', error);
            setNotes([]);
            setError(error.response?.data?.message || 'No Notes Created Till Now');
        } finally {
            setIsLoading(false);
        }
    }, [folderId]);

    const fetchFolderName = useCallback(async () => {
        try {
            const response = await folderService.getFolder(folderId);
            console.log(response);
            setFolderName(response.data.folderName);
        } catch (error) {
            console.error('Error fetching folder name:', error);
            setFolderName('Unknown Folder');
        }
    }, [folderId]);

    useEffect(() => {
        console.log('Selected Folder ID:', folderId);
        fetchFolderName();
        fetchNotes();
    }, [folderId, fetchNotes,  fetchFolderName, refresh]);

    const handleDeleteNote = async (noteId) => {
        if (window.confirm('Are you sure you want to delete this note?')) {
            try {
                await noteService.deleteNotesFromFolder(folderId, noteId);
                fetchNotes();

                window.location.reload(); // Reload the page after deleting the note
            } catch (error) {
                console.error('Error deleting note:', error);
                setError(error.response?.data?.message ||  'Error deleting note');
            }
        }
    };

    if (isLoading) {
        return <div>Loading notes...</div>;
    }

    return (
        <Sidebar>
            <h2>My Notes: {folderName}</h2>
            {error && <div style={{ color: 'red', marginBottom: '20px' }}>{error}</div>}
            <>
                {notes.map(note => (
                    <NoteCard key={note.noteId} onClick={() => onSelectNote(note.noteId)}>
                        <NoteTitle>{note.title}</NoteTitle> {/* Ensure this matches the note data structure */}
                        <ActionButtons>
                            <IconButton 
                                variant="edit" 
                                onClick={() => onEditNote(note.noteId)}
                            >
                                <FontAwesomeIcon icon={faEdit} />
                            </IconButton>
                            <IconButton 
                                variant="delete" 
                                onClick={() => handleDeleteNote(note.noteId)}
                            >
                                <FontAwesomeIcon icon={faTrash} />
                            </IconButton>
                        </ActionButtons>
                    </NoteCard>
                ))}
                <CreateButton onClick={onCreateNote}>
                    <FontAwesomeIcon icon={faPlus} />
                </CreateButton>
            </>
        </Sidebar>
    );
};

export default NoteList;