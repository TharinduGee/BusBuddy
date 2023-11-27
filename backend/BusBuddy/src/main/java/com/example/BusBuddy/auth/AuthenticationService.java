package com.example.BusBuddy.auth;


import com.example.BusBuddy.service.JwtService;
import com.example.BusBuddy.user.Role;
import com.example.BusBuddy.user.User;
import com.example.BusBuddy.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;



    public AuthenticationResponse register(RegisterRequest request) {
        System.out.println("Register request");
        var user = new User(
                request.getFirstname(),
                request.getLastname(),
                request.getEmail(),
                passwordEncoder.encode(request.getPassword()) ,
                Role.USER
        );
        System.out.println("Test");
        var jwtToken = jwtService.generateToken(user);
        System.out.println("Test");
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();

    };


    public AuthenticationResponse authentication(AuthenticationRequest request) {

        authenticationManager.authenticate(

                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        var user = repository.findByEmail(request.getEmail())
                .orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();

    }

}
