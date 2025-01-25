import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import noteService from '../../services/noteService';

const EditorContainer = styled.div`
    background: rgba(30, 41, 59, 0.95);
    backdrop-filter: blur(20px);
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 8px 32px rgba(0, 255, 255, 0.1);
    border: 1px solid rgba(0, 255, 255, 0.1);
    margin: 20px;
`;

const Input = styled.input`
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    border-radius: 8px;
    border: 1px solid rgba(0, 255, 255, 0.2);
    background: rgba(30, 41, 59, 0.95);
    color: #ffffff;
`;

const Textarea = styled.textarea`
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    border-radius: 8px;
    border: 1px solid rgba(0, 255, 255, 0.2);
    background: rgba(30, 41, 59, 0.95);
    color: #ffffff;
    height: 500px;
`;

const Button = styled.button`
    padding: 10px 20px;
    border-radius: 8px;
    border: none;
    background: linear-gradient(135deg, #00c9ff, #92fe9d);
    color: white;
    cursor: pointer;
    box-shadow: 0 4px 15px rgba(0, 201, 255, 0.3);
    transition: all 0.3s ease;

    &:hover {
        background: linear-gradient(135deg, #92fe9d, #00c9ff);
    }
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

    const handleSaveNote = async () => {
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

    if (isLoading) {
        return <div>Loading note...</div>;
    }

    return (
        <EditorContainer>
            <h2>{noteId ? 'Edit Note' : 'Create Note'}</h2>
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
            <Button onClick={handleSaveNote}>
                {noteId ? 'Update Note' : 'Create Note'}
            </Button>
        </EditorContainer>
    );
};

export default NoteEditor;