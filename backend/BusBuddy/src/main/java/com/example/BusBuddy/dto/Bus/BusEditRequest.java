package com.example.BusBuddy.dto.Bus;

import com.example.BusBuddy.models.BusType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class BusEditRequest {
    Long busId;
    @NotNull(message = "This field can't be null")
    BusType type;

    @NotBlank(message = "This field can't be null")
    String numberPlate;
    Integer seats;

    @NotBlank(message = "This field can't be null")
    String regNo;
}
