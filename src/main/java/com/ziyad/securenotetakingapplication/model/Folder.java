package com.ziyad.securenotetakingapplication.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@Entity
public class Folder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "folder_id", nullable = false)
    private Long folderId;

    @Column(name = "folder_name", nullable = false)
    private String folderName;

    @Column(name = "folder_created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "folder_updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @ManyToOne
    @JoinColumn(name = "user")
    private User user;
}
