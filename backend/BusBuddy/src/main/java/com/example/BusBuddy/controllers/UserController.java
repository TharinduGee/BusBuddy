package com.example.BusBuddy.controllers;

import com.example.BusBuddy.models.User;
import com.example.BusBuddy.services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("api/v1")
public class UserController {
    private final UserService userService;

    @GetMapping("/user/findByUsername")
    public ResponseEntity<List<User>> findUnassignedUsersByUsername(@RequestParam String query){
        System.out.println("Executed");
        List<User> users = userService.findUnassignedUsersByUsername(query);
        return ResponseEntity.ok(users);
    }
}
