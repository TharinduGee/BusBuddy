package com.example.BusBuddy.services;

import com.example.BusBuddy.dto.SignUpRequest;
import com.example.BusBuddy.user.User;

public interface AuthService {
    User signUp(SignUpRequest signUpRequest);
}
