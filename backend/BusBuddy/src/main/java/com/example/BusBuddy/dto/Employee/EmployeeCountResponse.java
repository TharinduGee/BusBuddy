package com.example.BusBuddy.dto.Employee;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeCountResponse {
    private Long totalCount;
    private Long driverCount;
    private Long conductorCount;
}
