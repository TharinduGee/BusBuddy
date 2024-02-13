package com.example.BusBuddy.controllers;

import com.example.BusBuddy.dto.Employee.EmployeeAddRequest;
import com.example.BusBuddy.models.Employee;
import com.example.BusBuddy.services.EmployeeService;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("api/v1/employee")
public class EmployeeController {

    private final EmployeeService employeeService;

    @PostMapping("/add")
    public ResponseEntity<Employee>  addEmployee(@RequestBody Employee request){
                Employee newEmployee = employeeService.save(request);
                return ResponseEntity.status(HttpStatus.OK).body(newEmployee);
    }
}
