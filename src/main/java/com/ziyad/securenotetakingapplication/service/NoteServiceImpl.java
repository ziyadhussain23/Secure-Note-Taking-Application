package com.ziyad.securenotetakingapplication.service;

import com.ziyad.securenotetakingapplication.config.AppConstants;
import com.ziyad.securenotetakingapplication.exceptions.APIException;
import com.ziyad.securenotetakingapplication.exceptions.ResourceNotFoundException;
import com.ziyad.securenotetakingapplication.model.Folder;
import com.ziyad.securenotetakingapplication.model.Note;
import com.ziyad.securenotetakingapplication.model.User;
import com.ziyad.securenotetakingapplication.payload.NoteDTO;
import com.ziyad.securenotetakingapplication.payload.NoteResponse;
import com.ziyad.securenotetakingapplication.repository.FolderRepository;
import com.ziyad.securenotetakingapplication.repository.NoteRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

@AllArgsConstructor
@Service
public class NoteServiceImpl implements NoteService{
    private final NoteRepository noteRepository;
    private final FolderRepository folderRepository;
    private final ModelMapper modelMapper;

    @Override
    public NoteDTO createNoteInFolder(User user, NoteDTO noteDTO, Long folderId) {
        Folder folder = folderRepository.findByUserAndFolderId(user, folderId)
                .orElseThrow(() -> new ResourceNotFoundException("Folder", "folderId", folderId));


        if(noteRepository.existsByFolderAndNoteTitle(folder, noteDTO.getTitle())){
            throw new APIException("Note with this title already exists in this folder!");
        }
        folder.setUpdatedAt(LocalDateTime.now());

        Note note = new Note();
        note.setNoteTitle(noteDTO.getTitle());
        note.setNoteContent(noteDTO.getContent());
        note.setNoteCreatedAt(LocalDateTime.now());
        note.setNoteUpdatedAt(LocalDateTime.now());
        note.setFolder(folder);

        noteRepository.save(note);
        return modelMapper.map(note, NoteDTO.class);
    }

    @Override
    public NoteResponse getNotesInFolder(User user, Long folderId, Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {
        Folder folder = folderRepository.findByUserAndFolderId(user, folderId)
                .orElseThrow(() -> new ResourceNotFoundException("Folder", "folderId", folderId));

        List<String> allowedSortFields = Arrays.asList("noteTitle", "noteUpdatedAt");

        if (!allowedSortFields.contains(sortBy)) {
            sortBy = AppConstants.SORT_BY_NOTE;
        }
        Sort sortByAndOrder = sortOrder.equalsIgnoreCase("asc")
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageable = PageRequest.of(pageNumber, pageSize, sortByAndOrder);
        Page<Note> notePage = noteRepository.findAllByFolder(folder, pageable);
        if(notePage.isEmpty()){
            throw new APIException("No note created till now.");
        }
        if(pageNumber >= notePage.getTotalPages()){
            throw new APIException("Page number exceeds total pages!");
        }
        List<Note> notes = notePage.getContent();
        NoteResponse noteResponse = new NoteResponse();
        List<NoteDTO> noteDTOS = notes.stream().map(note ->modelMapper.map(note, NoteDTO.class)).toList();
        noteResponse.setNotes(noteDTOS);
        noteResponse.setPageNumber(notePage.getNumber());
        noteResponse.setPageSize(notePage.getSize());
        noteResponse.setTotalPages(notePage.getTotalPages());
        noteResponse.setTotalElements(notePage.getTotalElements());
        noteResponse.setIsLastPage(notePage.isLast());
        return noteResponse;
    }

    @Override
    public NoteDTO deleteNotesFromFolder(User user, Long folderId, Long noteId) {
        Folder folder = folderRepository.findByUserAndFolderId(user, folderId)
                .orElseThrow(() -> new ResourceNotFoundException("Folder", "folderId", folderId));
        Note note = noteRepository.findByFolderAndNoteId(folder, noteId)
                .orElseThrow(() -> new ResourceNotFoundException("Note", "noteId", noteId));
        noteRepository.delete(note);
        return modelMapper.map(note, NoteDTO.class);
    }

    @Override
    public NoteDTO updateNoteFromFolder(User user, Long folderId, Long noteId, NoteDTO noteDTO) {
        Folder folder = folderRepository.findByUserAndFolderId(user, folderId)
                .orElseThrow(() -> new ResourceNotFoundException("Folder", "folderId", folderId));
        Note note = noteRepository.findByFolderAndNoteId(folder, noteId)
                .orElseThrow(() -> new ResourceNotFoundException("Note", "noteId", noteId));
        if(!note.getNoteTitle().equals(noteDTO.getTitle())){
            if(noteRepository.existsByFolderAndNoteTitle(folder, noteDTO.getTitle())){
                throw new APIException("Note with this title already exists in this folder!");
            }
            note.setNoteTitle(noteDTO.getTitle());
        }
        note.setNoteContent(noteDTO.getContent());
        note.setNoteUpdatedAt(LocalDateTime.now());
        noteRepository.save(note);
        return modelMapper.map(note, NoteDTO.class);
    }

    @Override
    public NoteDTO getNoteById(User user, Long noteId) {
        Note note = noteRepository.findById(noteId)
                .orElseThrow(() -> new ResourceNotFoundException("Note", "noteId", noteId));
        return modelMapper.map(note, NoteDTO.class);
    }
}
