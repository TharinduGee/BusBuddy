package com.example.BusBuddy.dto.Authentication;

import com.example.BusBuddy.models.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SignUpRequest {
  @NotNull(message = "FirstName : null")
  String firstName;
  @NotNull(message = "LastName : null")
  String lastName;
  @Email(message = "Email : Not valid")
  @NotNull(message = "Email : null")
  String email;
  @NotNull(message = "Password : null")
  String password;
  @NotNull(message = "MobileNo : null")
  String mobileNo;
  @NotNull(message = "Role : null")
  Role role;
}
