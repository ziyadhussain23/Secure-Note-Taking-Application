package com.ziyad.securenotetakingapplication.security.request;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class SignupRequest {
    @NotBlank
    @Size(min = 3, max = 20, message = "The username must be between 3 and 20 character")
    private String username;
    @NotBlank
    @Size(min = 8, message = "The username must be of 8 character")
    private String password;
    @NotBlank
    @Email
    private String email;

    @NotBlank
    private String firstName;

    private String lastName;
}
