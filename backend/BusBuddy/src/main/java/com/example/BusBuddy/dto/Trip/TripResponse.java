package com.example.BusBuddy.dto.Trip;

import com.example.BusBuddy.models.TripStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Time;
import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TripResponse {
    private Long tripId;
    private LocalDate date;
    private String startDestination;
    private String endDestination;
    private Time startTime;
    private Time endTime;
    private Double income;
    private Double expense;
    private Long driverId;
    private Long conductorId;
    private Long busId;
    private Long routeId;
    private TripStatus status;
}
