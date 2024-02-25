package com.example.BusBuddy.controllers;

import com.example.BusBuddy.dto.Employee.EmployeeAddRequest;
import com.example.BusBuddy.dto.Employee.EmployeeEditReq;
import com.example.BusBuddy.dto.Employee.EmployeePaginationResponse;
import com.example.BusBuddy.dto.Employee.EmployeeResponse;
import com.example.BusBuddy.models.Employee;
import com.example.BusBuddy.services.EmployeeService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("api/v1/employee")
public class EmployeeController {

    private final EmployeeService employeeService;

    @GetMapping("/findEmployees")
    public ResponseEntity<EmployeePaginationResponse>  findAll(HttpServletRequest httpServletRequest,
                                                               @RequestParam(value = "pageNo", defaultValue = "0" , required = false) int pageNumber,
                                                               @RequestParam(value = "pageSize", defaultValue = "6" , required = false)int pageSize){
        return employeeService.findEmployees(httpServletRequest, pageNumber, pageSize);
    }

    @PostMapping("/add")
    public ResponseEntity<EmployeeResponse>  addEmployee(HttpServletRequest httpRequest ,  @RequestBody EmployeeAddRequest request){
                EmployeeResponse newEmployee = employeeService.save(httpRequest , request);
                return ResponseEntity.status(HttpStatus.OK).body(newEmployee);
    }

    @PostMapping("/edit")
    public  ResponseEntity<String> editEmployee(@RequestBody EmployeeEditReq employeeEditReq){
        return employeeService.editEmployee(employeeEditReq);
    }

    @DeleteMapping("/remove")
    public ResponseEntity<String> removeEmployee(@RequestParam Long empId){
        return employeeService.removeEmployee(empId);
    }

}
