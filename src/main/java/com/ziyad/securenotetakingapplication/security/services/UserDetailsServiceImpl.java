package com.ziyad.securenotetakingapplication.security.services;


import com.ziyad.securenotetakingapplication.exceptions.ResourceNotFoundException;
import com.ziyad.securenotetakingapplication.model.User;
import com.ziyad.securenotetakingapplication.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class
UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    @Transactional
    public UserDetailsImpl loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", username));

        return UserDetailsImpl.build(user);
    }
}
