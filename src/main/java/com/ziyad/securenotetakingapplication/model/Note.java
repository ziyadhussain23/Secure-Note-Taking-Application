package com.ziyad.securenotetakingapplication.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@Entity
@Table(uniqueConstraints = {
        @UniqueConstraint(columnNames = {"note_title", "folder_id"})
})
public class Note {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "note_id", nullable = false)
    private Long noteId;

    @NotBlank
    @Column(name = "note_title", nullable = false)
    private String noteTitle;

    @Lob
    @Column(name = "note_content", nullable = false)
    private String noteContent;

    @Column(name = "note_created_at", nullable = false)
    private LocalDateTime noteCreatedAt;

    @Column(name = "note_updated_at", nullable = false)
    private LocalDateTime noteUpdatedAt;

    @ManyToOne
    @JoinColumn(name = "folder_id", nullable = false)
    private Folder folder;
}