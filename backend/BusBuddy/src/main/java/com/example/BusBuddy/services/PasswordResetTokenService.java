package com.example.BusBuddy.services;

import com.example.BusBuddy.Exception.EntityNotFoundException;
import com.example.BusBuddy.Exception.PasswordResetTokenInvalidException;
import com.example.BusBuddy.models.PasswordResetToken;
import com.example.BusBuddy.models.User;
import com.example.BusBuddy.repositories.PasswordResetTokenRepository;
import com.example.BusBuddy.repositories.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@AllArgsConstructor
public class PasswordResetTokenService {

    private final PasswordResetTokenRepository passwordResetTokenRepository;
    private final UserRepository userRepository;
    private final JavaMailSender javaMailSender;
    private final  PasswordEncoder passwordEncoder;

    @Transactional
    public String createPasswordResetTokenUser(HttpServletRequest request, String email ){

        User user = userRepository.findByEmail(email).orElseThrow(
                () -> new EntityNotFoundException("User is not found"));
        String token = UUID.randomUUID().toString();

        PasswordResetToken passwordResetToken = PasswordResetToken.builder()
                .token(token)
                .user(user)
                .expirationDateTime(LocalDateTime.now().plusMinutes(15))
                .build();

        if(user.getPasswordResetToken() != null){
            passwordResetTokenRepository.deleteByToken(user.getPasswordResetToken().getToken());
            passwordResetTokenRepository.save(passwordResetToken);
        }
        passwordResetTokenRepository.save(passwordResetToken);
        user.setPasswordResetToken(passwordResetToken);
        userRepository.save(user);

        String appUrl = request.getScheme() + "://" + request.getServerName() +
                ":" + 3000;
        SimpleMailMessage simpleMailMessage = constructResetTokenEmail(appUrl, token , user);
        javaMailSender.send(simpleMailMessage);

        return "Reset password email sent";
    }

    @Transactional
    public String updatePassword(String token ,  String password){
        String result = validatePasswordResetToken(token);
        if(result != null){
            throw new PasswordResetTokenInvalidException("Invalid reset token");
        }else{
            User user = passwordResetTokenRepository.findByToken(token).getUser();
            user.setPassword(passwordEncoder.encode(password));
            userRepository.save(user);
            passwordResetTokenRepository.deleteByToken(token);

            return "Password changed";
        }
    }

    private SimpleMailMessage constructResetTokenEmail(String contextPath, String token, User user){
        String url = contextPath + "/user/changePassword?token=" + token;
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setSubject("Reset Password - BusBuddy");
        simpleMailMessage.setText("Click the link to reset your password : " + "\n" + url + "\nNote :  This link id valid only for 15 minutes." );
        simpleMailMessage.setTo(user.getEmail());
        simpleMailMessage.setFrom("bus");
        return simpleMailMessage;
    }

    private String validatePasswordResetToken(String token){
        PasswordResetToken passwordResetToken = passwordResetTokenRepository.findByToken(token);
        if(passwordResetToken == null ||
                passwordResetToken.getExpirationDateTime().isBefore(LocalDateTime.now())){
            return "Invalid token";
        }

        return null;
    }

}
