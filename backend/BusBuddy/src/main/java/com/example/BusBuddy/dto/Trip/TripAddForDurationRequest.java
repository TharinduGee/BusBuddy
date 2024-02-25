package com.example.BusBuddy.dto.Trip;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TripAddForDurationRequest {
    private LocalDate firstDate;
    private LocalDate LastDate;
    private TripAddRequest tripAddRequest;
}
