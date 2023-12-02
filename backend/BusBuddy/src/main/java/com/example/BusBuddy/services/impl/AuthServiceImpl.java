package com.example.BusBuddy.services.impl;

import com.example.BusBuddy.dto.SignUpRequest;
import com.example.BusBuddy.services.AuthService;
import com.example.BusBuddy.user.Role;
import com.example.BusBuddy.user.User;
import com.example.BusBuddy.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final UserRepository userRepository;

    private  final PasswordEncoder passwordEncoder;

    public User signUp(SignUpRequest signUpRequest){
        User user = new User();
        user.setUsername(signUpRequest.getUsername());
        user.setEmail(signUpRequest.getEmail());
        user.setFirstname(signUpRequest.getFirstname());
        user.setLastname(signUpRequest.getLastname());
        user.setRole(Role.USER);
        user.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));

        return userRepository.save(user);
    }

}
