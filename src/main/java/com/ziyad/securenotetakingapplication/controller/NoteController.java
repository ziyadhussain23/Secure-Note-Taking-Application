package com.ziyad.securenotetakingapplication.controller;

import com.ziyad.securenotetakingapplication.config.AppConstants;
import com.ziyad.securenotetakingapplication.exceptions.APIException;
import com.ziyad.securenotetakingapplication.exceptions.ResourceNotFoundException;
import com.ziyad.securenotetakingapplication.payload.NoteDTO;
import com.ziyad.securenotetakingapplication.payload.NoteResponse;
import com.ziyad.securenotetakingapplication.repository.UserRepository;
import com.ziyad.securenotetakingapplication.service.NoteService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@RequestMapping("/note")
public class NoteController {
    private final NoteService noteService;
    private final UserRepository userRepository;


    @PostMapping("/folder/note/create")
    public NoteDTO addNoteToFolder(Authentication authentication, @Valid @RequestBody NoteDTO noteDTO) {
        if (authentication == null) {
            throw new APIException("Please login first");
        }

        return noteService.createNoteInFolder(userRepository.findByUsername(authentication.getName())
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", authentication.getName())), noteDTO);
    }

    @GetMapping("/{folderName}/notes")
    public NoteResponse getNotesInFolder(Authentication authentication, @PathVariable String folderName,
                                         @RequestParam (name = "pageNumber", defaultValue = AppConstants.PAGE_NUMBER, required = false) Integer pageNumber,
                                         @RequestParam (name = "pageSize", defaultValue = AppConstants.PAGE_SIZE, required = false) Integer pageSize,
                                         @RequestParam (name = "sortBy", defaultValue = AppConstants.SORT_BY_NOTE, required = false) String sortBy,
                                         @RequestParam (name = "sortOrder", defaultValue = AppConstants.SORT_ORDER, required = false) String sortOrder) {
        if (authentication == null) {
            throw new APIException("Please login first");
        }
        if(pageSize <= 0){
            throw new APIException("Page size must be greater than 0.");
        }
        if(pageNumber < 0){
            throw new APIException("Page number must be greater than or equal to 0.");
        }

        return noteService.getNotesInFolder(userRepository.findByUsername(authentication.getName())
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", authentication.getName())), folderName,
                pageNumber, pageSize, sortBy, sortOrder);
    }
}
