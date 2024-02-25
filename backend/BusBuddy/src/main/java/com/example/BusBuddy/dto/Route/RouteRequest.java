package com.example.BusBuddy.dto.Route;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RouteRequest {
    @NotBlank(message = "This field can't be empty")
    private String startDestination;
    @NotBlank(message = "This field can't be empty")
    private String endDestination;
    private double distance;
    private Integer noOfSections;
    @NotNull(message = "Date should be selected")
    private Date permitExpDate;
}
