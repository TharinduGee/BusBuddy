package com.example.BusBuddy.controllers;

import com.example.BusBuddy.dto.Authentication.JwtAuthenticationResponse;
import com.example.BusBuddy.dto.Authentication.RefreshTokenRequest;
import com.example.BusBuddy.dto.Authentication.SignInRequest;
import com.example.BusBuddy.dto.Authentication.SignUpRequest;
import com.example.BusBuddy.services.AuthenticationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class AuthenticationController {

    @Autowired
    private final AuthenticationService authenticationService;

    @PostMapping("/signUp")
    public ResponseEntity<String> signUpAdmin(@RequestBody @Valid SignUpRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(authenticationService.signUp(request));
    }

    @PostMapping("/signIn")
    public ResponseEntity<JwtAuthenticationResponse> signIn(@RequestBody @Valid  SignInRequest request) {
        return ResponseEntity.status(HttpStatus.OK).body(authenticationService.signIn(request));
    }

    @PostMapping("/refreshToken")
    public ResponseEntity<JwtAuthenticationResponse> refreshToken(@RequestParam String refreshToken) {
        JwtAuthenticationResponse response = authenticationService.refreshToken(refreshToken);
        if (response != null){
            return ResponseEntity.ok(response);
        }else{
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
    }

}