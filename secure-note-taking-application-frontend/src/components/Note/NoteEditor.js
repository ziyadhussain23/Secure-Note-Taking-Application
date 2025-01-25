import React, { useState, useEffect, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import noteService from '../../services/noteService';

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

const EditorContainer = styled.div`
    background: rgba(30, 41, 59, 0.95);
    backdrop-filter: blur(20px);
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 8px 32px rgba(0, 255, 255, 0.1);
    border: 1px solid rgba(0, 255, 255, 0.1);
    margin: 20px;
    animation: ${fadeIn} 0.5s ease-in-out;
`;

const Input = styled.input`
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    border-radius: 8px;
    border: 1px solid rgba(0, 255, 255, 0.2);
    background: rgba(30, 41, 59, 0.95);
    color: #ffffff;
    text-align: center;
`;

const Textarea = styled.textarea`
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    border-radius: 8px;
    border: 1px solid rgba(0, 255, 255, 0.2);
    background: rgba(30, 41, 59, 0.95);
    color: #ffffff;
    height: 480px;
`;


const Button = styled.button`
    padding: 12px 24px;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;

    ${props => props.primary ? `
        background: linear-gradient(45deg, #6e8efb, #a777e3);
        color: white;
        &:hover {
            background: linear-gradient(45deg, #00b4e6, #7fe48c);
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

const NoteEditor = ({ noteId, folderId, onNoteSaved }) => {
    const [note, setNote] = useState({ title: '', content: '' });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchNote = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await noteService.getNoteById(noteId);
            setNote({
                title: response.data.title,
                content: response.data.content,
            });
            console.log('Note state updated:', {
                title: response.data.title,
                content: response.data.content,
            });
            setError('');
        } catch (error) {
            console.error('Failed to fetch note:', error);
            setError(error.response?.data?.message || 'Failed to fetch note');
        } finally {
            setIsLoading(false);
        }
    }, [noteId]);

    useEffect(() => {
        if (noteId) {
            fetchNote();
        } else {
            setIsLoading(false);
        }
    }, [noteId, fetchNote]);

    const handleSaveNote = async (e) => {
        e.preventDefault();
        setError('');
        try {
            if (noteId) {
                await noteService.updateNoteFromFolder(folderId, noteId, note.title, note.content);
            } else {
                await noteService.createNoteInFolder(folderId, note.title, note.content);
            }
            onNoteSaved();
        } catch (error) {
            console.error('Failed to save note:', error);
            setError(error.response?.data?.message || 'Failed to save note');
        }
    };
    const handleBack = () => {
        onNoteSaved();
    };

    if (isLoading) {
        return <div>Select a folder or note to edit or create a new one.</div>;
    }

    return (
        <EditorContainer>
            <Button onClick={handleBack}>
                ← Back
            </Button>
            <h2 align= "center">{noteId ? 'Note' : 'Create Note'}</h2>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <Input
                type="text"
                value={note.title}
                onChange={(e) => setNote({ ...note, title: e.target.value })}
                placeholder="Note Title"
            />
            <Textarea
                value={note.content}
                onChange={(e) => setNote({ ...note, content: e.target.value })}
                placeholder="Note Content"
            />
            <Button onClick={handleSaveNote} primary>
                {noteId ? 'Update Note' : 'Create Note'}
            </Button>
        </EditorContainer>
    );
};

export default NoteEditor;