package com.example.BusBuddy.dto.Employee;

import com.example.BusBuddy.models.Document;
import com.example.BusBuddy.models.EmployeeType;
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
public class EmployeeResponse {
    private String empId;
    private String name;
    private Float salary;
    private Date bDay;
    private Integer age;
    private Date joinedDate;
    private EmployeeType designation;
}
