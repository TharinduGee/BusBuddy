package com.example.BusBuddy.services;

import com.example.BusBuddy.dto.JwtAuthResponse;
import com.example.BusBuddy.dto.SignInRequest;
import com.example.BusBuddy.dto.SignUpRequest;
import com.example.BusBuddy.user.User;

public interface AuthService {
    User signUp(SignUpRequest signUpRequest);

    JwtAuthResponse signIn(SignInRequest signInRequest);
}
