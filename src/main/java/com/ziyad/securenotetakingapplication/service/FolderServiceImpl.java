package com.ziyad.securenotetakingapplication.service;

import com.ziyad.securenotetakingapplication.config.AppConstants;
import com.ziyad.securenotetakingapplication.exceptions.APIException;
import com.ziyad.securenotetakingapplication.exceptions.ResourceNotFoundException;
import com.ziyad.securenotetakingapplication.model.Folder;
import com.ziyad.securenotetakingapplication.model.User;
import com.ziyad.securenotetakingapplication.payload.FolderDTO;
import com.ziyad.securenotetakingapplication.payload.FolderResponse;
import com.ziyad.securenotetakingapplication.repository.FolderRepository;
import jakarta.transaction.Transactional;
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
public class FolderServiceImpl implements FolderService {

    private final FolderRepository folderRepository;
    private final ModelMapper modelMapper;

    @Override
    @Transactional
    public FolderDTO createFolder(User user, FolderDTO folderDTO) {
        if(folderRepository.existsByUserAndFolderName(user, folderDTO.getFolderName())) {
            throw new APIException("Folder with this name already exists");
        }
        Folder folder = new Folder();
        folder.setUser(user);
        folder.setFolderName(folderDTO.getFolderName());
        folder.setCreatedAt(LocalDateTime.now());
        folder.setUpdatedAt(LocalDateTime.now());

        folderRepository.save(folder);
        return modelMapper.map(folder, FolderDTO.class);
    }

    @Override
    public FolderResponse getAllFolders(User user, Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {
        List<String> allowedSortFields = Arrays.asList("folderName", "updatedAt");

        if (!allowedSortFields.contains(sortBy)) {
            sortBy = AppConstants.SORT_BY;
        }
        Sort sortByAndOrder = sortOrder.equalsIgnoreCase("asc")
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageable = PageRequest.of(pageNumber, pageSize, sortByAndOrder);
        Page<Folder> folderPage = folderRepository.findAllByUser(user, pageable);
        if(folderPage.isEmpty()){
            throw new APIException("No folders created till now.");
        }
        if(pageNumber >= folderPage.getTotalPages()){
            throw new APIException("Page number exceeds total pages!");
        }
        List<Folder> folders = folderPage.getContent();
        FolderResponse folderResponse = new FolderResponse();
        List<FolderDTO> folderDTOS = folders.stream().map(folder ->modelMapper.map(folder, FolderDTO.class)).toList();
        folderResponse.setFolders(folderDTOS);
        folderResponse.setPageNumber(folderPage.getNumber());
        folderResponse.setPageSize(folderPage.getSize());
        folderResponse.setTotalPages(folderPage.getTotalPages());
        folderResponse.setTotalElements(folderPage.getTotalElements());
        folderResponse.setIsLastPage(folderPage.isLast());
        return folderResponse;
    }

    @Override
    public FolderDTO updateFolder(User user, FolderDTO folderDTO, Long folderId) {
        Folder folder = folderRepository.findByUserAndFolderId(user, folderId)
                .orElseThrow(() -> new ResourceNotFoundException("Folder", "folderId", folderId));
        folder.setFolderName(folderDTO.getFolderName());
        folder.setUpdatedAt(LocalDateTime.now());
        folderRepository.save(folder);
        return modelMapper.map(folder, FolderDTO.class);
    }

    @Override
    @Transactional
    public FolderDTO deleteFolder(User user, Long folderId) {
        Folder folder = folderRepository.findByUserAndFolderId(user, folderId)
                .orElseThrow(() -> new ResourceNotFoundException("Folder", "folderId", folderId));
        folderRepository.delete(folder);
        return modelMapper.map(folder, FolderDTO.class);
    }

}
