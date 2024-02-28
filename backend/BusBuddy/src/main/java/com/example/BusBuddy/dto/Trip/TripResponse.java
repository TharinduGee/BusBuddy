package com.example.BusBuddy.dto.Trip;

import com.example.BusBuddy.models.Route;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TripResponse {
    private String startTime;
    private String endTime;
}
