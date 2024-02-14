package com.example.BusBuddy.services;

import com.example.BusBuddy.dto.JwtAuthenticationResponse;
import com.example.BusBuddy.dto.RefreshTokenRequest;
import com.example.BusBuddy.dto.SignInRequest;
import com.example.BusBuddy.dto.SignUpRequest;
import com.example.BusBuddy.models.Business;
import com.example.BusBuddy.models.Role;
import com.example.BusBuddy.models.User;
import com.example.BusBuddy.repositories.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;

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
  public ResponseEntity<JwtAuthenticationResponse> signUpAdmin(SignUpRequest request) {


      var business =  new Business();
      business = businessService.save(business);
      var user = User
                  .builder()
                  .firstName(request.getFirstName())
                  .lastName(request.getLastName())
                  .email(request.getEmail())
                  .password(passwordEncoder.encode(request.getPassword()))
                  .role(Role.ROLE_ADMIN)
                  .mobileNo(request.getMobileNo())
                  .business(business)
                  .build();

      user = userService.save(user);
      var jwt = jwtService.generateToken(user);
      var refreshToken = jwtService.generateRefreshToken(user);

      var jwtAuthenticationResponse =  JwtAuthenticationResponse.builder()
              .token(jwt)
              .refreshToken(refreshToken)
              .role(user.getRole())
              .build();

      return ResponseEntity.status(HttpStatus.CREATED).body(jwtAuthenticationResponse);
  }


    public ResponseEntity<String> signUp(SignUpRequest request) {

        var user = User
                .builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole())
                .mobileNo(request.getMobileNo())
                .build();

        user = userService.save(user);

        return ResponseEntity.status(HttpStatus.CREATED).body("Account is successfully created.");
    }


  public ResponseEntity<JwtAuthenticationResponse> signIn(SignInRequest request) {

      try {
          authenticationManager.authenticate(
                  new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
          var user = userRepository.findByEmail(request.getEmail())
                  .orElseThrow(() -> new IllegalArgumentException("Invalid email or password."));
          var jwt = jwtService.generateToken(user);
          var refreshToken = jwtService.generateRefreshToken(user);
          var jwtAuthenticationResponse = JwtAuthenticationResponse.builder()
                  .token(jwt)
                  .refreshToken(refreshToken)
                  .role(user.getRole()).build();

          return ResponseEntity.status(HttpStatus.OK).body(jwtAuthenticationResponse);
      }catch(DataIntegrityViolationException ex){
          throw  new DataIntegrityViolationException(ex.getMessage());
      }

  }

  public JwtAuthenticationResponse refreshToken(RefreshTokenRequest refreshTokenRequest){
      String userEmail = jwtService.extractUserName(refreshTokenRequest.getToken());
      User user = userRepository.findByEmail(userEmail).orElseThrow();
      if(jwtService.isTokenValid(refreshTokenRequest.getToken(),user )){
          var jwt = jwtService.generateToken(user);
          //sould do buider implementation
          JwtAuthenticationResponse jwtAuthenticationResponse = new JwtAuthenticationResponse();

          jwtAuthenticationResponse.setToken(jwt);
          jwtAuthenticationResponse.setRefreshToken(refreshTokenRequest.getToken());
          return jwtAuthenticationResponse;
      }
      return null;
  }
  
}
