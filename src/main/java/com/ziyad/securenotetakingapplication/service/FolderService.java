package com.ziyad.securenotetakingapplication.service;

import com.ziyad.securenotetakingapplication.model.User;
import com.ziyad.securenotetakingapplication.payload.FolderDTO;
import com.ziyad.securenotetakingapplication.payload.FolderResponse;
import org.springframework.stereotype.Service;

@Service
public interface FolderService {
    FolderDTO createFolder(User user, FolderDTO folderDTO);

    FolderResponse getAllFolders(User user, Integer pageNumber, Integer pageSize, String sortBy, String sortOrder);

    FolderDTO updateFolder(User byUsername, FolderDTO folderDTO, Long folderId);

    FolderDTO deleteFolder(User user, Long folderId);

}
