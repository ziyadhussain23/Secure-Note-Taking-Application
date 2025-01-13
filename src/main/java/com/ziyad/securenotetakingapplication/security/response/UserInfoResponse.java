package com.ziyad.securenotetakingapplication.security.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserInfoResponse {
    private Long id;
    private String username;
    private List<String> roles;
    private String email;
    private String firstName;
    private String lastName;
}


