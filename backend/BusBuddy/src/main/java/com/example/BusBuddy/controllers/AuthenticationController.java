package com.example.BusBuddy.controllers;

import com.example.BusBuddy.dto.Authentication.JwtAuthenticationResponse;
import com.example.BusBuddy.dto.Authentication.SignInRequest;
import com.example.BusBuddy.dto.Authentication.SignUpRequest;
import com.example.BusBuddy.services.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class AuthenticationController {

    @Autowired
    private final AuthenticationService authenticationService;

    @PostMapping("/signUp")
    public ResponseEntity<String> signUpAdmin(@RequestBody SignUpRequest request) {
        return authenticationService.signUp(request);
    }

//    @PostMapping("/signUp")
//    public ResponseEntity<String> signUp(@RequestBody SignUpRequest request) {
//        return authenticationService.signUp(request);
//    }

    @PostMapping("/signIn")
    public ResponseEntity<JwtAuthenticationResponse> signIn(@RequestBody SignInRequest request) {
        return authenticationService.signIn(request);
    }

//    @PostMapping("/refreshtoken")
//    public JwtAuthenticationResponse refreshToken(@RequestBody RefreshTokenRequest refreshTokenRequest) {
//        return authenticationService.refreshToken(refreshTokenRequest);
//    }

}