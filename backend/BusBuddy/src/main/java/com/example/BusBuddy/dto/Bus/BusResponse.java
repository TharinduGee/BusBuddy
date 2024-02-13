package com.example.BusBuddy.dto.Bus;

import com.example.BusBuddy.models.BusType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
public class BusResponse {
    private Long bId;
    private Date lastServiceDate;
    private String numberPlate;
    private String regNo;
    private BusType type;
    private Integer seats;
}
