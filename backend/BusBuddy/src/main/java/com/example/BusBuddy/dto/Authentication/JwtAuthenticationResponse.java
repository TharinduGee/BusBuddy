package com.example.BusBuddy.dto.Authentication;

import com.example.BusBuddy.models.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JwtAuthenticationResponse {
  String token;
  String refreshToken;
  Role role;
}
