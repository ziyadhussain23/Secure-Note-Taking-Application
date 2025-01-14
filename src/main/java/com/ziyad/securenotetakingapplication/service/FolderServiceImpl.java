package com.ziyad.securenotetakingapplication.service;

import com.ziyad.securenotetakingapplication.config.AppConstants;
import com.ziyad.securenotetakingapplication.exceptions.APIException;
import com.ziyad.securenotetakingapplication.exceptions.ResourceNotFoundException;
import com.ziyad.securenotetakingapplication.model.Folder;
import com.ziyad.securenotetakingapplication.model.User;
import com.ziyad.securenotetakingapplication.payload.FolderDTO;
import com.ziyad.securenotetakingapplication.payload.FolderResponse;
import com.ziyad.securenotetakingapplication.repository.FolderRepository;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

@Service
public class FolderServiceImpl implements FolderService {

    private final FolderRepository folderRepository;
    private final ModelMapper modelMapper;

    public FolderServiceImpl(FolderRepository folderRepository, ModelMapper modelMapper) {
        this.folderRepository = folderRepository;
        this.modelMapper = modelMapper;
    }


    @Override
    public FolderDTO createFolder(User user, FolderDTO folderDTO) {
        if(folderRepository.existsByUserAndFolderName(user, folderDTO.getFolderName())){
            throw new APIException("Folder with this name already exists!");
        }
        Folder folder = new Folder();
        folder.setUser(user);
        folder.setFolderName(folderDTO.getFolderName());
        folder.setCreatedAt(LocalDateTime.now());
        folder.setUpdatedAt(LocalDateTime.now());
        parentFolder(user, folderDTO, folder);
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
        if(pageNumber >= folderPage.getTotalPages()){
            throw new APIException("Page number exceeds total pages!");
        }
        if(folderPage.isEmpty()){
            throw new APIException("No folders created till now.");
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
    public FolderDTO updateFolder(User user, FolderDTO folderDTO, String folderName) {
        if(folderRepository.existsByUserAndFolderName(user, folderDTO.getFolderName())){
            throw new APIException("Folder with this name already exists!");
        }
        if(!folderRepository.existsByUserAndFolderName(user, folderName)){
            throw new ResourceNotFoundException("Folder", "folderName", folderName);
        }
        Folder folder = folderRepository.findByUserAndFolderName(user, folderName);
        folder.setFolderName(folderDTO.getFolderName());
        folder.setUpdatedAt(LocalDateTime.now());
        folderRepository.save(folder);
        return modelMapper.map(folder, FolderDTO.class);
    }

    @Override
    public FolderDTO deleteFolder(User user, String folderName) {
        if(!folderRepository.existsByUserAndFolderName(user, folderName)){
            throw new ResourceNotFoundException("Folder", "folderName", folderName);
        }
        Folder folder = folderRepository.findByUserAndFolderName(user, folderName);
        folderRepository.delete(folder);
        return modelMapper.map(folder, FolderDTO.class);
    }

    @Override
    public FolderDTO moveFolder(User user, FolderDTO folderDTO, String folderName) {
        if(!folderRepository.existsByUserAndFolderName(user, folderName)){
            throw new ResourceNotFoundException("Folder", "folderName", folderName);
        }
        Folder folder = folderRepository.findByUserAndFolderName(user, folderName);
        parentFolder(user, folderDTO, folder);
        folder.setUpdatedAt(LocalDateTime.now());
        folderRepository.save(folder);
        return modelMapper.map(folder, FolderDTO.class);
    }

    private void parentFolder(User user, FolderDTO folderDTO, Folder folder) {
        if(folderDTO.getParentFolderName() != null){
            Folder parentFolder = folderRepository.findByUserAndFolderName(user, folderDTO.getParentFolderName());
            if(parentFolder == null){
                parentFolder = new Folder();
                parentFolder.setUser(user);
                parentFolder.setFolderName(folderDTO.getParentFolderName());
                parentFolder.setCreatedAt(LocalDateTime.now());
                folderRepository.save(parentFolder);
            }
            parentFolder.setUpdatedAt(LocalDateTime.now());
            folder.setParentFolder(parentFolder);
        }
    }


}
