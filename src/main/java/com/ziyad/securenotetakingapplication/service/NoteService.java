package com.ziyad.securenotetakingapplication.service;

import com.ziyad.securenotetakingapplication.model.User;
import com.ziyad.securenotetakingapplication.payload.NoteDTO;
import com.ziyad.securenotetakingapplication.payload.NoteResponse;
import org.springframework.stereotype.Service;

@Service
public interface NoteService {
    NoteDTO createNoteInFolder(User user, NoteDTO noteDTO);

    NoteResponse getNotesInFolder(User user, String folderName, Integer pageNumber, Integer pageSize, String sortBy, String sortOrder);
}
