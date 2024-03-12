package com.example.BusBuddy.dto.Trip;

import com.example.BusBuddy.models.TripStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Time;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TripResponseForEmployee {
    private String startDestination;
    private String endDestination;
    private Time startTime;
    private Time endTime;
    private String employeeName;
    private TripStatus status;
}
