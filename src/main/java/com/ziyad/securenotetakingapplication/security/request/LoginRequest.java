package com.ziyad.securenotetakingapplication.security.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class LoginRequest {
    @NotBlank
    @Size(min = 3, max = 20, message = "The username must be between 3 and 20 characters")
    private String username;
    @NotBlank
    @Size(min = 8, message = "The username must be of 8 characters")
    private String password;
}
