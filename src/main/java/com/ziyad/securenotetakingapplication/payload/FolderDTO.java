package com.ziyad.securenotetakingapplication.payload;


import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class FolderDTO {

    @NotBlank
    private String folderName;

    private LocalDateTime updatedAt;
}
