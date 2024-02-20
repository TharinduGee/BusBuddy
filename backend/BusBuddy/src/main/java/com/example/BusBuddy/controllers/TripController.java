package com.example.BusBuddy.controllers;

import com.example.BusBuddy.dto.Trip.TripAddForDurationRequest;
import com.example.BusBuddy.dto.Trip.TripAddRequest;
import com.example.BusBuddy.services.TripService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@AllArgsConstructor
@RequestMapping("api/v1/trip")
public class TripController {

    private final TripService tripService;

    @PostMapping("/scheduleTripsForDuration")
    public ResponseEntity<String> addTripsForDuration(HttpServletRequest httpServletRequest, @RequestBody TripAddForDurationRequest tripAddForDurationRequest){
        return tripService.addTripsForDuration(httpServletRequest ,tripAddForDurationRequest);
    }

    @PostMapping("/add")
    public ResponseEntity<String> addTrip(HttpServletRequest httpServletRequest, @RequestBody TripAddRequest tripAddRequest , @RequestParam LocalDate date){
        return tripService.addTrip(httpServletRequest, tripAddRequest, date);
    }

    @DeleteMapping("/remove")
    public ResponseEntity<String> remove(@RequestParam Long tripId){
        return tripService.remove(tripId);
    }

}
