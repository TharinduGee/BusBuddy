package com.example.BusBuddy.services;

import com.example.BusBuddy.models.Trip;
import com.example.BusBuddy.repositories.TripRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class RealTimeServices {

    private final TripRepository tripRepository;
    private final BusinessService businessService;


    public Double getIncome(HttpServletRequest httpServletRequest){
        double income  = 0.0;
        List<Trip> trips =  tripRepository.findByBusiness(businessService.extractBId(httpServletRequest));
        income  = trips.stream().mapToDouble(Trip::getIncome).sum();
        return income;
    }

}
