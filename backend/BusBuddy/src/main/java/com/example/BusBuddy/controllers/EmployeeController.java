package com.example.BusBuddy.controllers;

import com.example.BusBuddy.dto.Employee.*;
import com.example.BusBuddy.models.Employee;
import com.example.BusBuddy.services.EmployeeService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("api/v1/employee")
@CrossOrigin(origins = "http://localhost:3000")
public class EmployeeController {

    private final EmployeeService employeeService;

    @GetMapping("/findAll")
    @PreAuthorize("hasRole('SYSTEM_ADMIN')")
    public ResponseEntity<EmployeePaginationResponse>  findAll(@RequestParam(value = "pageNo", defaultValue = "0" , required = false) int pageNumber,
                                                               @RequestParam(value = "pageSize", defaultValue = "6" , required = false)int pageSize){
        return employeeService.findAll(pageNumber, pageSize);
    }

    @GetMapping("/findEmployees")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<EmployeePaginationResponse>  findEmployees(HttpServletRequest httpServletRequest,
            @RequestParam(value = "name" , required = false) String name,
                                                                     @RequestParam(value = "pageNo", defaultValue = "0" , required = false) int pageNumber,
                                                               @RequestParam(value = "pageSize", defaultValue = "5" , required = false)int pageSize){
        return employeeService.findEmployees(httpServletRequest,name, pageNumber, pageSize);
    }

    @PostMapping("/add")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<EmployeeResponse>  addEmployee(HttpServletRequest httpRequest ,  @RequestBody @Valid EmployeeAddRequest request){
                EmployeeResponse newEmployee = employeeService.save(httpRequest , request);
                return ResponseEntity.status(HttpStatus.OK).body(newEmployee);
    }

    @PostMapping("/edit")
    @PreAuthorize("hasRole('ADMIN')")
    public  ResponseEntity<String> editEmployee(@RequestBody @Valid EmployeeEditReq employeeEditReq){
        return employeeService.editEmployee(employeeEditReq);
    }

    @DeleteMapping("/remove")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> removeEmployee(@RequestParam Long empId){
        return employeeService.removeEmployee(empId);
    }

    @GetMapping("/countEmployee")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<EmployeeCountResponse> countEmployee(HttpServletRequest httpServletRequest){
        return employeeService.countEmployee(httpServletRequest);
    }

}
