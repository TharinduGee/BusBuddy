package com.example.BusBuddy.dto.Trip;

import jakarta.validation.constraints.NotNull;
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
    @NotNull(message = "First Date should be specified.")
    private LocalDate firstDate;
    @NotNull(message = "Last Date should be specified.")
    private LocalDate LastDate;
    private TripAddRequest tripAddRequest;
}
