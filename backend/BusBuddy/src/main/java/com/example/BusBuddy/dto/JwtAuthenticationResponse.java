package com.example.BusBuddy.dto;

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
  Long BId;
  String firstName;
  String LastName;
}
