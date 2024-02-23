package com.example.BusBuddy.dto.Route;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RouteEditRequest {
    private long routeId;
    @NotBlank(message = "This field can't be empty")
    private String startDestination;
    @NotBlank(message = "This field can't be empty")
    private String endDestination;
    private double distance;
    private Integer noOfSections;
    @NotNull(message = "Date should be selected")
    private Date permitExpDate;
}
