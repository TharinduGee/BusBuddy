package com.example.BusBuddy.dto.Route;

import lombok.*;

import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RouteResponse {
    private Long routeId;
    private String startDestination;
    private String endDestination;
    private double distance;
    private Integer noOfSections;
    private Date permitExpDate;
}
