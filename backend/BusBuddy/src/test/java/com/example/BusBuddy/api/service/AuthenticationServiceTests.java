package com.example.BusBuddy.api.service;

import com.example.BusBuddy.Exception.EntityNotFoundException;
import com.example.BusBuddy.Exception.UserNotAssignedException;
import com.example.BusBuddy.dto.Authentication.JwtAuthenticationResponse;
import com.example.BusBuddy.dto.Authentication.SignInRequest;
import com.example.BusBuddy.dto.Authentication.SignUpRequest;
import com.example.BusBuddy.models.Business;
import com.example.BusBuddy.models.Role;
import com.example.BusBuddy.models.User;
import com.example.BusBuddy.repositories.UserRepository;
import com.example.BusBuddy.services.AuthenticationService;
import com.example.BusBuddy.services.BusinessService;
import com.example.BusBuddy.services.JwtService;
import com.example.BusBuddy.services.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class AuthenticationServiceTests {
    @Mock
    private UserRepository userRepository;

    @Mock
    private UserService userService;

    @Mock
    private BusinessService businessService;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtService jwtService;

    @Mock
    private AuthenticationManager authenticationManager;

    @InjectMocks
    private AuthenticationService authenticationService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testSignUp_AdminRole() {

        SignUpRequest request = new SignUpRequest();
        request.setRole(Role.ROLE_ADMIN);
        Business business = new Business();
        User user = new User();
        when(businessService.save(any(Business.class))).thenReturn(business);
        when(userService.save(any(User.class))).thenReturn(user);


        String result = authenticationService.signUp(request);
        assertEquals("Account is created successfully.", result);
        verify(userService, times(1)).save(any(User.class));
    }

    @Test
    void testSignUp_NonAdminRole() {

        SignUpRequest request = new SignUpRequest();
        request.setRole(Role.ROLE_DRIVER);
        User user = new User();
        when(userService.save(any(User.class))).thenReturn(user);


        String result = authenticationService.signUp(request);
        assertEquals("Account is created successfully.", result);
        verify(userService, times(1)).save(any(User.class));
    }

    @Test
    void testSignIn_Success() {

        SignInRequest request = new SignInRequest();
        request.setEmail("test@example.com");
        request.setPassword("password");
        User user = new User();
        user.setBusiness(new Business());
        when(userRepository.findByEmail(anyString())).thenReturn(Optional.of(user));
        when(jwtService.generateToken(any(User.class))).thenReturn("token");
        when(jwtService.generateRefreshToken(any(User.class))).thenReturn("refreshToken");
        JwtAuthenticationResponse expectedResponse = new JwtAuthenticationResponse("token", "refreshToken", user.getRole());


        JwtAuthenticationResponse response = authenticationService.signIn(request);
        assertEquals(expectedResponse, response);
    }

    @Test
    void testSignIn_UserNotFound() {

        SignInRequest request = new SignInRequest();
        request.setEmail("test@example.com");
        request.setPassword("password");
        when(userRepository.findByEmail(anyString())).thenReturn(Optional.empty());


        assertThrows(EntityNotFoundException.class, () -> authenticationService.signIn(request));
    }

    @Test
    void testSignIn_UserNotAssignedToBusiness() {

        SignInRequest request = new SignInRequest();
        request.setEmail("test@example.com");
        request.setPassword("password");
        User user = new User();
        when(userRepository.findByEmail(anyString())).thenReturn(Optional.of(user));


        assertThrows(UserNotAssignedException.class, () -> authenticationService.signIn(request));
    }

    @Test
    void testRefreshToken_Success() {

        String refreshToken = "refreshToken";
        String userEmail = "test@example.com";
        User user = new User();
        when(jwtService.extractUserName(refreshToken)).thenReturn(userEmail);
        when(userRepository.findByEmail(userEmail)).thenReturn(Optional.of(user));
        when(jwtService.isTokenValid(refreshToken, user)).thenReturn(true);
        when(jwtService.generateToken(user)).thenReturn("newToken");
        when(jwtService.generateRefreshToken(user)).thenReturn("newRefreshToken");
        JwtAuthenticationResponse expectedResponse = new JwtAuthenticationResponse("newToken", "newRefreshToken", user.getRole());


        JwtAuthenticationResponse response = authenticationService.refreshToken(refreshToken);
        assertEquals(expectedResponse.getToken(), response.getToken());
    }

    @Test
    void testRefreshToken_UserNotFound() {

        String refreshToken = "refreshToken";
        String userEmail = "test@example.com";
        when(jwtService.extractUserName(refreshToken)).thenReturn(userEmail);
        when(userRepository.findByEmail(userEmail)).thenReturn(Optional.empty());


        assertThrows(EntityNotFoundException.class, () -> authenticationService.refreshToken(refreshToken));
    }

    @Test
    void testRefreshToken_InvalidToken() {

        String refreshToken = "refreshToken";
        String userEmail = "test@example.com";
        User user = new User();
        when(jwtService.extractUserName(refreshToken)).thenReturn(userEmail);
        when(userRepository.findByEmail(userEmail)).thenReturn(Optional.of(user));
        when(jwtService.isTokenValid(refreshToken, user)).thenReturn(false);


        JwtAuthenticationResponse response = authenticationService.refreshToken(refreshToken);
        assertNull(response);
    }
}
