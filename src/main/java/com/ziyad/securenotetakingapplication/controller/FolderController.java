package com.ziyad.securenotetakingapplication.controller;

import com.ziyad.securenotetakingapplication.config.AppConstants;
import com.ziyad.securenotetakingapplication.exceptions.APIException;
import com.ziyad.securenotetakingapplication.exceptions.ResourceNotFoundException;
import com.ziyad.securenotetakingapplication.payload.FolderDTO;
import com.ziyad.securenotetakingapplication.payload.FolderResponse;
import com.ziyad.securenotetakingapplication.repository.UserRepository;
import com.ziyad.securenotetakingapplication.service.FolderService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/note/folder")
public class FolderController {

    private final FolderService folderService;

    private final UserRepository userRepository;
    @Autowired
    public FolderController(FolderService folderService, UserRepository userRepository) {
        this.folderService = folderService;
        this.userRepository = userRepository;
    }

    @GetMapping("/get")
    public ResponseEntity<FolderResponse> getAllFolder(Authentication authentication,
                                                       @RequestParam (name = "pageNumber", defaultValue = AppConstants.PAGE_NUMBER, required = false) Integer pageNumber,
                                                       @RequestParam (name = "pageSize", defaultValue = AppConstants.PAGE_SIZE, required = false) Integer pageSize,
                                                       @RequestParam (name = "sortBy", defaultValue = AppConstants.SORT_BY, required = false) String sortBy,
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
        FolderResponse folderResponse = folderService.getAllFolders(userRepository.findByUsername(authentication.getName())
            .orElseThrow(() -> new ResourceNotFoundException("User", "username", authentication.getName())), pageNumber, pageSize, sortBy, sortOrder);
        return new ResponseEntity<>(folderResponse, org.springframework.http.HttpStatus.OK);
    }


    @PostMapping("/create")
    public FolderDTO addFolder(Authentication authentication, @Valid @RequestBody FolderDTO folderDTO) {
        if(authentication == null) {
            throw new APIException("Please login first");
        }

        return folderService.createFolder(userRepository.findByUsername(authentication.getName())
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", authentication.getName())), folderDTO);
    }

    @PutMapping("/update/{folderName}")
    public FolderDTO updateFolder(@PathVariable String folderName, Authentication authentication, @Valid @RequestBody FolderDTO folderDTO) {
        if(authentication == null) {
            throw new APIException("Please login first");
        }
        return folderService.updateFolder(userRepository.findByUsername(authentication.getName())
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", authentication.getName())), folderDTO, folderName);
    }

    @PutMapping("/move/{folderName}")
    public FolderDTO moveFolder(@PathVariable String folderName, Authentication authentication, @Valid @RequestBody FolderDTO folderDTO) {
        if(authentication == null) {
            throw new APIException("Please login first");
        }
        return folderService.moveFolder(userRepository.findByUsername(authentication.getName())
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", authentication.getName())), folderDTO, folderName);
    }

    @DeleteMapping("/delete/{folderName}")
    public FolderDTO deleteFolder(@PathVariable String folderName, Authentication authentication) {
        if(authentication == null) {
            throw new APIException("Please login first");
        }
        return folderService.deleteFolder(userRepository.findByUsername(authentication.getName())
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", authentication.getName())), folderName);
    }
}
