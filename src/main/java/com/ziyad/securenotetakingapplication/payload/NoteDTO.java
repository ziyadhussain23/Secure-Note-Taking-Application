package com.ziyad.securenotetakingapplication.payload;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class NoteDTO {

    private Long noteId;
    @NotBlank
    private String title;

    @NotBlank
    private String content;

    private LocalDateTime updatedAt;

    private String folderName;
}
