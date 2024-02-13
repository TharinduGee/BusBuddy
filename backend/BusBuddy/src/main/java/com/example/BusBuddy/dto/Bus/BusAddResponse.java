package com.example.BusBuddy.dto.Bus;


import com.example.BusBuddy.models.BusType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@Builder
@AllArgsConstructor
public class BusAddResponse {
    Long bId;
    BusType type;
    Integer seats;
    String regNo;
    String numberPlate;
}
