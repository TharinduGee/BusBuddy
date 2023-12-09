package com.example.BusBuddy.controllers;

import com.example.BusBuddy.dto.JwtAuthenticationResponse;
import com.example.BusBuddy.dto.RefreshTokenRequest;
import com.example.BusBuddy.dto.SignInRequest;
import com.example.BusBuddy.dto.SignUpRequest;
import com.example.BusBuddy.services.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/signUp")
    public ResponseEntity<String> signUp(@RequestBody SignUpRequest request) {
        try{
            return authenticationService.signUp(request);
        }catch(Exception e){
            //only triggered when server error
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + e.getMessage());
        }
    }

    @PostMapping("/signIn")
    public ResponseEntity<String> signIn(@RequestBody SignInRequest request) {
        try{
            return authenticationService.signIn(request);
        }catch(BadCredentialsException e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("An error occurred: " + e.getMessage());
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + e.getMessage());
        }

    }


    @PostMapping("/refreshtoken")
    public JwtAuthenticationResponse refreshToken(@RequestBody RefreshTokenRequest refreshTokenRequest) {
        return authenticationService.refreshToken(refreshTokenRequest);
    }
}