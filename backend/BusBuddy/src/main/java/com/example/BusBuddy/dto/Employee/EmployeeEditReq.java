package com.example.BusBuddy.dto.Employee;

import com.example.BusBuddy.models.User;
import jakarta.validation.constraints.NotNull;
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

    @NotNull(message = "This field shouldn't be empty.")
    private Float salary;
}
