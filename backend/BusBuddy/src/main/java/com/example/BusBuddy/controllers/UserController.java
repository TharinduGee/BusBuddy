package com.example.BusBuddy.controllers;

import com.example.BusBuddy.dto.User.UserPaginationResponse;
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


    @GetMapping("/findUnEnrolledUsers")
    public ResponseEntity<UserPaginationResponse>  findUnEnrolledUsers(@RequestParam(value = "pageNo", defaultValue = "0" , required = false) int pageNumber,
                                                                          @RequestParam(value = "pageSize", defaultValue = "5" , required = false) int pageSize,
                                                                          @RequestParam(required = false) String email) {
        return userService.findUnEnrolledUsers(pageNumber , pageSize, email);
    }

    @PostMapping("/uploadImage")
    public ResponseEntity<String> uploadImage(HttpServletRequest httpServletRequest ,
                                              @RequestParam("image") MultipartFile file) throws IOException {
        return userService.uploadImage(httpServletRequest, file);
    }

    @GetMapping("/getImage")
    public ResponseEntity<byte[]> retrieveImage(HttpServletRequest httpServletRequest) throws IOException {
        return userService.getImage(httpServletRequest);
    }

    @GetMapping("/getUsername")
    public ResponseEntity<String> getUsername(HttpServletRequest httpServletRequest) throws IOException {
        return userService.getUsername(httpServletRequest);
    }

    @RequestMapping("/{id}")
    User showUserForm(@PathVariable("id") User user) {
        return user;
    }

}
