package com.example.BusBuddy.services;

import com.example.BusBuddy.models.PasswordResetToken;
import com.example.BusBuddy.models.User;
import com.example.BusBuddy.repositories.PasswordResetTokenRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@AllArgsConstructor
public class PasswordResetTokenService {

    private PasswordResetTokenRepository passwordResetTokenRepository;

    public void createPasswordResetTokenUser(User user ,String token){
        PasswordResetToken passwordResetToken = PasswordResetToken.builder()
                .token(token)
                .user(user)
                .expirationDateTime(LocalDateTime.now().plusMinutes(15))
                .build();

        passwordResetTokenRepository.save(passwordResetToken);
    }

    public String validatePasswordResetToken(String token){
        PasswordResetToken passwordResetToken = passwordResetTokenRepository.findByToken(token);
        if(passwordResetToken == null ||
                passwordResetToken.getExpirationDateTime().isBefore(LocalDateTime.now())){
            return "Invalid token";
        }

        return null;
    }

}
