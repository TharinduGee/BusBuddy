package com.example.BusBuddy.controllers;

import com.example.BusBuddy.dto.Review.ReviewAddRequest;
import com.example.BusBuddy.services.ReviewService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("api/v1/review")
public class ReviewController {

    private final ReviewService reviewService;

    // This review endpoint for the public users to review business, bus or employee
    @PostMapping("/add")
    public ResponseEntity<String> addService(@RequestBody @Valid ReviewAddRequest reviewAddRequest){
        return reviewService.addReview(reviewAddRequest);
    }

}
