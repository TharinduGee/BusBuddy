package com.example.BusBuddy.dto.Bus;

import com.example.BusBuddy.models.BusType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class BusEditResponse {
    private BusType type;
    private String numberPlate;
    private Integer seats;
    private String regNo;
}
