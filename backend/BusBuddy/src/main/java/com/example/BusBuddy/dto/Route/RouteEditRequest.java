package com.example.BusBuddy.dto.Route;

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
    private String startDestination;
    private String endDestination;
    private double distance;
    private Integer noOfSections;
    private Date permitExpDate;
}
