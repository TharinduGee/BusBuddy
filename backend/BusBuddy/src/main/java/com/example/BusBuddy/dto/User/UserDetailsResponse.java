package com.example.BusBuddy.dto.User;

import com.example.BusBuddy.models.EmployeeType;
import com.example.BusBuddy.models.Role;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDetailsResponse {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String mobileNo;
    private Role role;
    private Long empID;
    private EmployeeType type;
    private Date bDay;
    private Integer age;
    private Float salary;
}
