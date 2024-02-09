package com.example.BusBuddy.controllers;

import com.example.BusBuddy.dto.JwtAuthenticationResponse;
import com.example.BusBuddy.dto.RefreshTokenRequest;
import com.example.BusBuddy.dto.SignInRequest;
import com.example.BusBuddy.dto.SignUpRequest;
import com.example.BusBuddy.services.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class AuthenticationController {

    @Autowired
    private final AuthenticationService authenticationService;

    //@CrossOrigin(origins = "http://localhost:8081/api/v1/signUpAdmin")
    @PostMapping("/signUpAdmin")
    public ResponseEntity<JwtAuthenticationResponse> signUpAdmin(@RequestBody SignUpRequest request) {
        try{
            return authenticationService.signUpAdmin(request);
        }catch(DataIntegrityViolationException e){//trigger when duplicate key value appears
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
            // throw new DataIntegrityViolationException(e.getMessage());
        }catch (Exception e){//trigger for other errors
            throw  new InternalAuthenticationServiceException(e.getMessage());
        }
    }

    @PostMapping("/signUp")
    public ResponseEntity<JwtAuthenticationResponse> signUp(@RequestBody SignUpRequest request) {
        try{
            return authenticationService.signUp(request);
        }catch(DataIntegrityViolationException e){//trigger when duplicate key value appears
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
            // throw new DataIntegrityViolationException(e.getMessage());
        }catch (Exception e){//trigger for other errors
            throw  new InternalAuthenticationServiceException(e.getMessage());
        }
    }

    @PostMapping("/signIn")
    public ResponseEntity<JwtAuthenticationResponse> signIn(@RequestBody SignInRequest request) {
        try{
            return authenticationService.signIn(request);
        }catch(BadCredentialsException e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }

    }


//    @PostMapping("/refreshtoken")
//    public JwtAuthenticationResponse refreshToken(@RequestBody RefreshTokenRequest refreshTokenRequest) {
//        return authenticationService.refreshToken(refreshTokenRequest);
//    }
}