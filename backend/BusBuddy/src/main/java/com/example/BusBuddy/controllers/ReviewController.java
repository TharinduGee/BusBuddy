package com.example.BusBuddy.controllers;

import com.example.BusBuddy.dto.Review.ReviewAddRequest;
import com.example.BusBuddy.models.Review;
import com.example.BusBuddy.services.ReviewService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("api/v1/review")
@CrossOrigin(origins = "*")
public class ReviewController {

    private final ReviewService reviewService;

    // This review endpoint for the public users to review business, bus or employee
    @PostMapping("/add")
    public ResponseEntity<Review> addService(@RequestBody @Valid ReviewAddRequest reviewAddRequest){
        return ResponseEntity.ok(reviewService.addReview(reviewAddRequest));
    }

}
