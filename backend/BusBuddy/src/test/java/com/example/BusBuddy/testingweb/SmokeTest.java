package com.example.BusBuddy.testingweb;

import com.example.BusBuddy.controllers.AuthenticationController;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@SpringBootTest
public class SmokeTest {
    @Autowired
    private AuthenticationController authenticationController;

    @Test
    void contextLoads() throws Exception{
        assertThat(authenticationController).isNotNull();
    }
}
