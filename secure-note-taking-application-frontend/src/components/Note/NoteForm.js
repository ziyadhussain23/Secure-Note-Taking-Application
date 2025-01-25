import React, { useState, useEffect } from 'react';
import noteService from '../../services/noteService';

const NoteForm = ({ folderId, noteId, onNoteSaved }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        if (noteId) {
            const fetchNote = async () => {
                try {
                    const response = await noteService.getNoteInFolder(folderId, noteId);
                    setTitle(response.data.title);
                    setContent(response.data.content);
                } catch (error) {
                    console.error('Failed to fetch note', error);
                }
            };
            fetchNote();
        }
    }, [folderId, noteId]);

    const handleSaveNote = async (e) => {
        e.preventDefault();
        try {
            if (noteId) {
                await noteService.updateNoteFromFolder(folderId, noteId, title, content);
            } else {
                await noteService.createNoteInFolder(folderId, title, content);
            }
            setTitle('');
            setContent('');
            onNoteSaved();
        } catch (error) {
            console.error('Failed to save note', error);
        }
    };

    return (
        <form onSubmit={handleSaveNote}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Note Title"
                required
            />
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Note Content"
                required
            />
            <button type="submit">{noteId ? 'Update Note' : 'Create Note'}</button>
        </form>
    );
};

export default NoteForm;