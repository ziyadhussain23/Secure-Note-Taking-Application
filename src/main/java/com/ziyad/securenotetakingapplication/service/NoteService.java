package com.ziyad.securenotetakingapplication.service;

import com.ziyad.securenotetakingapplication.model.User;
import com.ziyad.securenotetakingapplication.payload.NoteDTO;
import com.ziyad.securenotetakingapplication.payload.NoteResponse;
import org.springframework.stereotype.Service;

@Service
public interface NoteService {
    NoteDTO createNoteInFolder(User user, NoteDTO noteDTO, Long folderId);

    NoteResponse getNotesInFolder(User user, Long folderId, Integer pageNumber, Integer pageSize, String sortBy, String sortOrder);

    NoteDTO deleteNotesFromFolder(User user, Long folderId, Long noteId);

    NoteDTO updateNoteFromFolder(User user, Long folderId, Long noteId, NoteDTO noteDTO);

    NoteDTO getNoteById(User user, Long noteId);
}
