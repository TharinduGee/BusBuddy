package com.example.BusBuddy.dto.Authentication;


import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class RefreshTokenRequest {
    @NotNull
    private String token;
}
