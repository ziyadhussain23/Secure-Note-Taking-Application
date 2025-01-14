package com.ziyad.securenotetakingapplication.repository;

import com.ziyad.securenotetakingapplication.model.Folder;
import com.ziyad.securenotetakingapplication.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;




@Repository
public interface FolderRepository extends JpaRepository<Folder, Long> {
    Page<Folder> findAllByUser(User user, Pageable pageable);

    Boolean existsByUserAndFolderName(User user, String folderName);

    Folder findByUserAndFolderName(User user, String folderName);

    Boolean existsByUserAndParentFolderAndFolderName(User user, Folder parentFolder, String folderName);

    void deleteFolderByParentFolder(Folder parentFolder);
}
