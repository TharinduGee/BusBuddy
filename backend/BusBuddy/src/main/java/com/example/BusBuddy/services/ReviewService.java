package com.example.BusBuddy.services;

import com.example.BusBuddy.Exception.EntityNotFoundExceptions.EntityNotFoundException;
import com.example.BusBuddy.dto.Review.ReviewAddRequest;
import com.example.BusBuddy.models.Bus;
import com.example.BusBuddy.models.Business;
import com.example.BusBuddy.models.Employee;
import com.example.BusBuddy.models.Review;
import com.example.BusBuddy.repositories.BusRepository;
import com.example.BusBuddy.repositories.BusinessRepository;
import com.example.BusBuddy.repositories.EmployeeRepository;
import com.example.BusBuddy.repositories.ReviewRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

import org.jetbrains.annotations.NotNull;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.LocalTime;

@Service
@AllArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final BusRepository busRepository;
    private final EmployeeRepository employeeRepository;
    private final BusinessRepository businessRepository;

    @Transactional
    public ResponseEntity<String> addReview(@NotNull ReviewAddRequest reviewAddRequest){
        Business business = null;
        Bus bus = null;
        Employee employee = null;
        if(reviewAddRequest.getBusId() != null){
            bus = busRepository.findById(reviewAddRequest.getBusId())
                    .orElseThrow(() -> new EntityNotFoundException("Bus is not found."));
        }
        if(reviewAddRequest.getEmpId() != null){
            employee = employeeRepository.findById(reviewAddRequest.getEmpId())
                    .orElseThrow(() -> new EntityNotFoundException("Employee is not found."));
        }
        if(reviewAddRequest.getB_id() != null){
            business = businessRepository.findById(reviewAddRequest.getB_id())
                    .orElseThrow(()-> new EntityNotFoundException("Business is not found"));
        }
        Review review = Review.builder()
                .timestamp(LocalDateTime.now())
                .comment(reviewAddRequest.getComment())
                .rating(reviewAddRequest.getRating())
                .employee(employee)
                .bus(bus)
                .business(business)
                .build();

        reviewRepository.save(review);
        return ResponseEntity.ok().body("Review is added successfully");

    }
}
