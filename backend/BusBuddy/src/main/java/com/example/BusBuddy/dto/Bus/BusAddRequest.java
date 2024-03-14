package com.example.BusBuddy.dto.Bus;

import com.example.BusBuddy.models.BusType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BusAddRequest {
    @NotNull(message = "Type : null")
    private BusType type;

    @NotBlank(message = "NumberPlate : null")
    private String numberPlate;

    private Date lastServicedDate;

    private Integer seats;

    private String regNo;
}
