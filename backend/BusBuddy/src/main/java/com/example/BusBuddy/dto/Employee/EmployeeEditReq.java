package com.example.BusBuddy.dto.Employee;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.Date;

@Data
@Builder
@RequiredArgsConstructor
@AllArgsConstructor
public class EmployeeEditReq {
    Long empId;
    byte[] imageData;
    Date bDay;
    Float salary;
}
