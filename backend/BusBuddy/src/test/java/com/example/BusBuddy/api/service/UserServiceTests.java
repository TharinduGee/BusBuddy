package com.example.BusBuddy.api.service;

import com.example.BusBuddy.dto.User.UserPaginationResponse;
import com.example.BusBuddy.models.User;
import com.example.BusBuddy.repositories.UserRepository;
import com.example.BusBuddy.services.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class UserServiceTests {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }


    @DisplayName("User find by mail - exception")
    @Test
    public void UserServiceFindByMail_Exception(){

        String exceptionMsg = null;
        try{
            userService.userDetailsService().loadUserByUsername("mydrivertestemail@gmail.com");
        }catch(Exception e){
            exceptionMsg = e.getMessage();
        }

        Assertions.assertThat(exceptionMsg).isEqualTo("User not found");

    }

}
