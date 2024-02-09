package com.example.BusBuddy.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class BusAddRequest {
    String numberPlate;
    Integer seats;
    String regNo;
}
