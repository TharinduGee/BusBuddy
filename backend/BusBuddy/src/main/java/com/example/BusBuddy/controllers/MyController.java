package com.example.BusBuddy.controllers;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/test")
public class MyController {
    @GetMapping("/example")
    public String exampleController(HttpServletRequest request) {
        // Retrieve the b_id attribute from the request
        String bId = (String) request.getAttribute("b_id");
        long longValue = Long.parseLong(bId);

        if (bId != null) {
            // Use the b_id in your controller logic
            return "The b_id is: " + longValue;
        } else {
            // Handle the case where b_id is not found in the request
            return "No b_id found in the request";
        }
    }
}
