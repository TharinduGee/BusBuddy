package com.example.BusBuddy.dto.Employee;

import com.example.BusBuddy.models.User;
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
    private Long empId;
    private Float salary;
}
