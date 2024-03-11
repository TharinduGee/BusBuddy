package com.example.BusBuddy.dto.Employee;

import com.example.BusBuddy.dto.User.UserResponse;
import com.example.BusBuddy.models.EmployeeType;
import com.example.BusBuddy.models.Role;
import com.example.BusBuddy.models.User;
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
public class EmployeeAddRequest {
    @NotBlank(message = "This field shouldn't be empty.")
    private String name;
    @NotBlank(message = "This field shouldn't be empty.")
    private Float salary;

    private Date joinedDate;

}
