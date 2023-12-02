package com.example.BusBuddy.services;

import org.springframework.security.core.userdetails.UserDetails;

public interface JWTService {

    String extractUserName(String token);

    String generateToken(UserDetails userDetails);

    boolean isTokenValid(String token , UserDetails userDetails);
}
