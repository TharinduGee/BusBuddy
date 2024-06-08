package com.example.BusBuddy.dto.Bus;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class BusInfo {
    private Long busId;
    private String numberPlate;
    private Integer seats;
}
