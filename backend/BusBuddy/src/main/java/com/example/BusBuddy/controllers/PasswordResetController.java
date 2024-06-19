package com.example.BusBuddy.controllers;

import com.example.BusBuddy.services.PasswordResetTokenService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@AllArgsConstructor
@RestController
@RequestMapping("api/v1/user")
@CrossOrigin(origins = "*")
public class PasswordResetController {

    private PasswordResetTokenService passwordResetTokenService;

    @PostMapping("/resetPassword")
    public ResponseEntity<String> resetPassword(HttpServletRequest request, @RequestParam("email") String email){
        return ResponseEntity.ok(passwordResetTokenService.createPasswordResetTokenUser(request, email));
    }

    @PostMapping("/updatePassword")
    public ResponseEntity<String> updatePassword(@RequestParam String token, @RequestParam String password){
        return ResponseEntity.ok(passwordResetTokenService.updatePassword(token, password));
    }


}
