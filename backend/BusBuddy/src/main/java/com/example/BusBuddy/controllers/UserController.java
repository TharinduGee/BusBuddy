package com.example.BusBuddy.controllers;

import com.example.BusBuddy.dto.User.UserResponse;
import com.example.BusBuddy.models.User;
import com.example.BusBuddy.services.UserService;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("api/v1")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    private final UserService userService;


    @GetMapping("/nullBusinessAndEmail")
    public List<UserResponse>  getUsersWithNullBusinessAndEmail(@RequestParam(required = false) String email) {
        return userService.getUsersWithNullBusinessAndEmail(email);
    }

    @RequestMapping("/{id}")
    User showUserForm(@PathVariable("id") User user) {
        return user;
    }

}
