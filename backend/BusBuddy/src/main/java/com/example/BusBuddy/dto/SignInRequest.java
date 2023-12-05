package com.example.BusBuddy.dto;

import lombok.Data;

@Data
public class SignInRequest {
    private String email;
    private String password;
}
