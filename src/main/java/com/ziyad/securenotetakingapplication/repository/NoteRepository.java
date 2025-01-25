package com.ziyad.securenotetakingapplication.repository;

import com.ziyad.securenotetakingapplication.model.Folder;
import com.ziyad.securenotetakingapplication.model.Note;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface NoteRepository extends JpaRepository<Note, Long> {
    Boolean existsByFolderAndNoteTitle(Folder folder,  String noteTitle);

    Page<Note> findAllByFolder(Folder folder, Pageable pageable);

    Optional<Note> findByFolderAndNoteId(Folder folder, Long noteId);
}
