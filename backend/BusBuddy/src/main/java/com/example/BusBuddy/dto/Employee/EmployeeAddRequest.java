package com.example.BusBuddy.dto.Employee;

import com.example.BusBuddy.models.EmployeeType;
import com.example.BusBuddy.models.Role;
import com.example.BusBuddy.models.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeAddRequest {
    private String name;
    private Float salary;
    private User user;
    private Date bDay;
    private Date joinedDate;
    private EmployeeType designation;
}
