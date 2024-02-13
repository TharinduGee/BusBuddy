package com.example.BusBuddy.dto.Bus;

import com.example.BusBuddy.models.BusType;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class BusEditRequest {
    Long busId;
    @NotEmpty(message = "Type should be selected.")
    BusType type;
    String numberPlate;
    Integer seats;
    String regNo;
}
