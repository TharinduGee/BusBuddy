package com.example.BusBuddy.dto.Bus;

import com.example.BusBuddy.models.BusType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class BusEditRequest {
    Long busId;
    BusType type;
    String numberPlate;
    Integer seats;
    String regNo;
}
