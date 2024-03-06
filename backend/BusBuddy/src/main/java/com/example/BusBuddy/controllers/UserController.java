package com.example.BusBuddy.controllers;

import com.example.BusBuddy.dto.User.UserResponse;
import com.example.BusBuddy.models.User;
import com.example.BusBuddy.services.UserService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("api/v1/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    private final UserService userService;


    @GetMapping("/nullBusinessAndEmail")
    public List<UserResponse>  getUsersWithNullBusinessAndEmail(@RequestParam(required = false) String email) {
        return userService.getUsersWithNullBusinessAndEmail(email);
    }

    @PostMapping("/uploadImage")
    public ResponseEntity<String> uploadImage(HttpServletRequest httpServletRequest ,
                                              @RequestParam("image") MultipartFile file) throws IOException {
        return userService.uploadImage(httpServletRequest, file);
    }

//    @GetMapping("/getImage")
//    public ResponseEntity<byte[]> retrieveImage(HttpServletRequest httpServletRequest) throws IOException {
//        return userService.getImage(httpServletRequest);
//    }

    @RequestMapping("/{id}")
    User showUserForm(@PathVariable("id") User user) {
        return user;
    }

}
