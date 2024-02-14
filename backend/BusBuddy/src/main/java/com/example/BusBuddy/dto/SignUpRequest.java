package com.example.BusBuddy.dto;

import com.example.BusBuddy.models.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SignUpRequest {
  @NotNull(message = "Firstname shouldn't be null")
  String firstName;
  @NotNull(message = "Lastname shouldn't be null")
  String lastName;
  @Email
  String email;
  String password;
  @NotNull
  @Pattern(regexp = "^\\+?[0-9]{1,3}?[-. ]?\\(?\\d{3}\\)?[-. ]?\\d{3}[-. ]?\\d{4}$\n")
  String mobileNo;

  Role role;
}
