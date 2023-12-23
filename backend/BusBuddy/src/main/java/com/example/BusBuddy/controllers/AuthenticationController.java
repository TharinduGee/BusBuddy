package com.example.BusBuddy.controllers;

import com.example.BusBuddy.dto.JwtAuthenticationResponse;
import com.example.BusBuddy.dto.RefreshTokenRequest;
import com.example.BusBuddy.dto.SignInRequest;
import com.example.BusBuddy.dto.SignUpRequest;
import com.example.BusBuddy.services.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @CrossOrigin(origins = "http://localhost:8081/api/v1/signUp")
    @PostMapping("/signUp")
    public ResponseEntity<String> signUp(@RequestBody SignUpRequest request) {
        try{
            return authenticationService.signUp(request);
        }catch(DataIntegrityViolationException e){//trigger when duplicate key value appears
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }catch (Exception e){//trigger for other errors
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
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