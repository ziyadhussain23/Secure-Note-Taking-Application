package com.ziyad.securenotetakingapplication.payload;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class NoteDTO {
    @NotBlank
    private String title;

    @NotBlank
    private String content;

    private LocalDateTime updatedAt;

    @NotBlank
    private String folderName;
}
