package com.ziyad.securenotetakingapplication.controller;

import com.ziyad.securenotetakingapplication.config.AppRole;
import com.ziyad.securenotetakingapplication.exceptions.APIException;
import com.ziyad.securenotetakingapplication.model.Role;
import com.ziyad.securenotetakingapplication.model.User;
import com.ziyad.securenotetakingapplication.repository.RoleRepository;
import com.ziyad.securenotetakingapplication.repository.UserRepository;
import com.ziyad.securenotetakingapplication.security.jwt.JwtUtils;
import com.ziyad.securenotetakingapplication.security.request.LoginRequest;
import com.ziyad.securenotetakingapplication.security.request.SignupRequest;
import com.ziyad.securenotetakingapplication.security.response.MessageResponse;
import com.ziyad.securenotetakingapplication.security.response.UserInfoResponse;
import com.ziyad.securenotetakingapplication.security.services.UserDetailsImpl;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@AllArgsConstructor
@RestController
@RequestMapping("/note/auth")
public class AuthController {

    private final JwtUtils jwtUtils;
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest, Authentication authentication) {
        if(authentication != null){
            return ResponseEntity.badRequest().body(new MessageResponse("Please log out first!"));
        }
        authentication = authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(),
                            loginRequest.getPassword()));


        SecurityContextHolder.getContext().setAuthentication(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        ResponseCookie jwtCookie = jwtUtils.generateJwtCookie(userDetails);

        List<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        UserInfoResponse userInfoResponse = new UserInfoResponse(userDetails.getId(),
                userDetails.getUsername(), roles,userDetails.getEmail(), userDetails.getFirstName(), userDetails.getLastName(), jwtCookie.toString());

        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE,
                        jwtCookie.toString())
                .body(userInfoResponse);
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest, Authentication authentication) {
        if(authentication != null){
            return ResponseEntity.badRequest().body(new MessageResponse("Please log out first!"));
        }
        if (userRepository.existsByUsername((signUpRequest.getUsername()))) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Username is already taken!"));
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Email is already in use!"));
        }

        User user = new User(signUpRequest.getUsername(),
                passwordEncoder.encode(signUpRequest.getPassword()),
                signUpRequest.getEmail(), signUpRequest.getFirstName(), signUpRequest.getLastName());



        Set<Role> roles = new HashSet<>();
        Role userRole = roleRepository.findByRoleName(AppRole.ROLE_VIEWER)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        roles.add(userRole);
        Role adminRole = roleRepository.findByRoleName(AppRole.ROLE_ADMIN)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        roles.add(adminRole);
        Role modRole = roleRepository.findByRoleName(AppRole.ROLE_EDITOR)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        roles.add(modRole);


        user.setRoles(roles);
        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }

    @GetMapping("/username")
    public String currentUserName(Authentication authentication){
        if (authentication != null)
            return authentication.getName();
        else
            throw new APIException("No user logged in!");
    }


    @GetMapping("/user")
    public ResponseEntity<?> getUserDetails(Authentication authentication){
        if(authentication != null) {
            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

            List<String> roles = userDetails.getAuthorities().stream()
                    .map(GrantedAuthority::getAuthority)
                    .collect(Collectors.toList());

            UserInfoResponse response = new UserInfoResponse(userDetails.getId(),
                    userDetails.getUsername(), roles, userDetails.getEmail(), userDetails.getFirstName(), userDetails.getLastName(), null);

            return ResponseEntity.ok().body(response);
        }else{
            return ResponseEntity.badRequest().body(new MessageResponse("No user logged in!"));
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> signoutUser(Authentication authentication){
        if(authentication == null){
            return ResponseEntity.badRequest().body(new MessageResponse("No user logged in!"));
        }
        ResponseCookie cookie = jwtUtils.getCleanJwtCookie();
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE,
                        cookie.toString())
                .body(new MessageResponse("You've been logged out!"));
    }
}