package com.example.BusBuddy.services;

import com.example.BusBuddy.Exception.EntityNotFoundException;
import com.example.BusBuddy.Exception.UserNotAssignedException;
import com.example.BusBuddy.dto.Authentication.JwtAuthenticationResponse;
import com.example.BusBuddy.dto.Authentication.RefreshTokenRequest;
import com.example.BusBuddy.dto.Authentication.SignInRequest;
import com.example.BusBuddy.dto.Authentication.SignUpRequest;
import com.example.BusBuddy.models.Business;
import com.example.BusBuddy.models.Role;
import com.example.BusBuddy.models.User;
import com.example.BusBuddy.repositories.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

  private final UserRepository userRepository;
  private final UserService userService;
  private final PasswordEncoder passwordEncoder;
  private final JwtService jwtService;
  private final AuthenticationManager authenticationManager;
  private final BusinessService businessService;

  @Transactional
  public ResponseEntity<String> signUp(@NotNull SignUpRequest request) {

      if(request.getRole() ==  Role.ROLE_ADMIN){
          var business =  new Business();
          business = businessService.save(business);
          var user = User
                  .builder()
                  .firstName(request.getFirstName())
                  .lastName(request.getLastName())
                  .email(request.getEmail())
                  .password(passwordEncoder.encode(request.getPassword()))
                  .role(request.getRole())
                  .mobileNo(request.getMobileNo())
                  .business(business)
                  .build();

          userService.save(user);
      }else{
          var user = User
                  .builder()
                  .firstName(request.getFirstName())
                  .lastName(request.getLastName())
                  .email(request.getEmail())
                  .password(passwordEncoder.encode(request.getPassword()))
                  .role(request.getRole())
                  .mobileNo(request.getMobileNo())
                  .build();
          userService.save(user);
      }

      return ResponseEntity.status(HttpStatus.CREATED).body("Account is created successfully.");
  }

  public ResponseEntity<JwtAuthenticationResponse> signIn(@NotNull SignInRequest request) {
        var user = userRepository.findByEmail(request.getEmail())
              .orElseThrow(() -> new EntityNotFoundException("User is not found."));
          authenticationManager.authenticate(
                  new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

          if(user.getBusiness() == null){
              throw new UserNotAssignedException();
          }
          var jwt = jwtService.generateToken(user);
          var refreshToken = jwtService.generateRefreshToken(user);
          var jwtAuthenticationResponse = JwtAuthenticationResponse.builder()
                  .token(jwt)
                  .refreshToken(refreshToken)
                  .role(user.getRole()).build();

          return ResponseEntity.status(HttpStatus.OK).body(jwtAuthenticationResponse);

  }

  @Transactional
  public JwtAuthenticationResponse refreshToken(@NotNull RefreshTokenRequest refreshTokenRequest){
      String userEmail = jwtService.extractUserName(refreshTokenRequest.getToken());
      User user = userRepository.findByEmail(userEmail).orElseThrow();
      if(jwtService.isTokenValid(refreshTokenRequest.getToken(),user )){
          var jwt = jwtService.generateToken(user);
          JwtAuthenticationResponse jwtAuthenticationResponse = new JwtAuthenticationResponse();

          jwtAuthenticationResponse.setToken(jwt);
          jwtAuthenticationResponse.setRefreshToken(refreshTokenRequest.getToken());
          return jwtAuthenticationResponse;
      }
      return null;
  }
  
}
