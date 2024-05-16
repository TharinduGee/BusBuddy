package com.example.BusBuddy.controllers;

import com.example.BusBuddy.dto.Trip.TripAddForDurationRequest;

import com.example.BusBuddy.dto.Trip.TripAddRequest;
import com.example.BusBuddy.dto.Trip.TripPaginationResponse;
import com.example.BusBuddy.dto.Trip.TripResponseForEmployee;
import com.example.BusBuddy.services.TripService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("api/v1/trip")
@CrossOrigin(origins = "*")
public class TripController {

    private final TripService tripService;

    @PostMapping("/scheduleTripsForDuration")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> addTripsForDuration(HttpServletRequest httpServletRequest, @RequestBody TripAddForDurationRequest tripAddForDurationRequest){
        return ResponseEntity.ok(tripService.addTripsForDuration(httpServletRequest ,tripAddForDurationRequest));
    }

    @PostMapping("/add")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> addTrip(HttpServletRequest httpServletRequest, @RequestBody TripAddRequest tripAddRequest , @RequestParam LocalDate date){
        return ResponseEntity.ok(tripService.addTrip(httpServletRequest, tripAddRequest, date));
    }

    @DeleteMapping("/remove")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> remove(@RequestParam Long tripId){
        return ResponseEntity.ok(tripService.remove(tripId));
    }

    @GetMapping("/findForEmployee")
    @PreAuthorize("hasAnyRole('DRIVER', 'CONDUCTOR')")
    public ResponseEntity<List<TripResponseForEmployee>> findTripByEmployee(HttpServletRequest httpServletRequest, @RequestParam @NotNull LocalDate date){
        return ResponseEntity.ok(tripService.findTripForEmployee(httpServletRequest , date));
    }

    @GetMapping("/findTrips")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<TripPaginationResponse> findTrips(HttpServletRequest httpServletRequest,
                                                            @RequestParam(value = "pageNo", defaultValue = "0" , required = false) int pageNumber,
                                                            @RequestParam(value = "pageSize", defaultValue = "5" , required = false) int pageSize,
                                                            @RequestParam  @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
                                                            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate
    ){
        return ResponseEntity.ok(tripService.findTrips(httpServletRequest, pageNumber, pageSize, startDate, endDate));
    }

}
