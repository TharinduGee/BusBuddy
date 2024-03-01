package com.example.BusBuddy.dto.Trip;

import com.example.BusBuddy.models.Route;
import com.example.BusBuddy.services.TripStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Time;
import java.time.LocalTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TripResponse {
    private String startDestination;
    private String endDestination;
    private Time startTime;
    private Time endTime;
    private TripStatus status;
}
