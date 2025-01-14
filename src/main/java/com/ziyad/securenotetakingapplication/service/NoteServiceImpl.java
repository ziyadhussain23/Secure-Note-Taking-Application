package com.ziyad.securenotetakingapplication.service;

import com.ziyad.securenotetakingapplication.config.AppConstants;
import com.ziyad.securenotetakingapplication.exceptions.APIException;
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
    public NoteDTO createNoteInFolder(User user, NoteDTO noteDTO) {
        Folder folder = folderRepository.findByUserAndFolderName(user, noteDTO.getFolderName());

        if(folder == null){
            folder = new Folder();
            folder.setUser(user);
            folder.setFolderName(noteDTO.getFolderName());
            folder.setCreatedAt(LocalDateTime.now());
            folderRepository.save(folder);
        }
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
    public NoteResponse getNotesInFolder(User user, String folderName, Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {
        Folder folder = folderRepository.findByUserAndFolderName(user, folderName);
        if(folder == null){
            throw new APIException("Folder does not exist!");
        }
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
}
