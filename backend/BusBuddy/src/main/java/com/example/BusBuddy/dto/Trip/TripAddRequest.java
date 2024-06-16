package com.example.BusBuddy.dto.Trip;

import jakarta.validation.constraints.NotNull;
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
    @NotNull(message = "Start tIme is required.")
    private Time startTime;
    @NotNull(message = "End time is required.")
    private Time endTime;
    private Long busId;
    private Long routeId;
    private Long driverId;
    private Long conductorId;
    private String ticketApiToken;
}



