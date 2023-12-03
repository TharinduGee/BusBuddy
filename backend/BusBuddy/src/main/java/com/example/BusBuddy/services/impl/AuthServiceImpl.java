package com.example.BusBuddy.services.impl;

import com.example.BusBuddy.dto.JwtAuthResponse;
import com.example.BusBuddy.dto.SignInRequest;
import com.example.BusBuddy.dto.SignUpRequest;
import com.example.BusBuddy.services.AuthService;
import com.example.BusBuddy.services.JWTService;
import com.example.BusBuddy.user.Role;
import com.example.BusBuddy.user.User;
import com.example.BusBuddy.user.UserRepository;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.HashMap;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final UserRepository userRepository;

    private  final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;

    private final JWTService jwtService;
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

    public JwtAuthResponse signIn(SignInRequest signInRequest){

        try {


            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            signInRequest.getEmail(),
                            signInRequest.getPassword()
                    )
            );
        } catch (AuthenticationException e) {
            // Handle authentication error, log or throw a specific exception
            e.printStackTrace(); // or log.error("Authentication failed", e);
        }

//        authenticationManager.authenticate(
//                new UsernamePasswordAuthenticationToken(
//                        signInRequest.getEmail(),
//                        signInRequest.getPassword()
//                )
//        );

        var user = userRepository.findByEmail(signInRequest.getEmail()).orElseThrow(() -> new IllegalArgumentException("Invalid email or password"));
        var jwt = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(new HashMap<>() , user);
        System.out.print("print");
        JwtAuthResponse jwtAuthResponse = new JwtAuthResponse();

        jwtAuthResponse.setToken(jwt);
        jwtAuthResponse.setRefreshToken(refreshToken);

        return jwtAuthResponse;


    }



}
