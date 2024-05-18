package com.example.BusBuddy.dto.Trip;

import com.example.BusBuddy.models.Employee;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class EmployeeInfo {
    private Long empId;
    private String name;
}
