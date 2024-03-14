package com.example.BusBuddy.dto.Trip;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Time;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TripAddRequest {
    private Time startTime;
    private Time endTime;
    private Float income;
    private Float Expense;
    private Long busId;
    private Long routeId;
    private Long driverId;
    private Long conductorId;
    private String ticketApiToken;
}



