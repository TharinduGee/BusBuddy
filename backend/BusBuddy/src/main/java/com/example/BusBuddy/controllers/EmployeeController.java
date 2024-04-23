package com.example.BusBuddy.controllers;

import com.example.BusBuddy.dto.Employee.*;
import com.example.BusBuddy.services.EmployeeService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Date;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("api/v1/employee")
@CrossOrigin(origins = "*")
public class EmployeeController {

    private final EmployeeService employeeService;

    @GetMapping("/findAll")
    @PreAuthorize("hasRole('SYSTEM_ADMIN')")
    public ResponseEntity<EmployeePaginationResponse>  findAll(@RequestParam(value = "pageNo", defaultValue = "0" , required = false) int pageNumber,
                                                               @RequestParam(value = "pageSize", defaultValue = "6" , required = false)int pageSize){
        return ResponseEntity.ok(employeeService.findAll(pageNumber, pageSize));
    }

    @GetMapping("/findEmployees")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<EmployeePaginationResponse>  findEmployees(HttpServletRequest httpServletRequest,
            @RequestParam(value = "name" , required = false) String name,
                                                                     @RequestParam(value = "pageNo", defaultValue = "0" , required = false) int pageNumber,
                                                               @RequestParam(value = "pageSize", defaultValue = "5" , required = false)int pageSize){
        return ResponseEntity.ok(employeeService.findEmployees(httpServletRequest,name, pageNumber, pageSize));
    }

    @PostMapping("/add")
    @PreAuthorize("hasRole('ADMIN')")
    public  ResponseEntity<String> add(HttpServletRequest httpServletRequest,
                                       @RequestParam Float salary,
                                       @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date joinedDate,
                                       @RequestParam(required = false) Date bDay,
                                       @RequestParam String email,
                                       @RequestParam(value = "file", required = false) MultipartFile file){
        return ResponseEntity.ok(employeeService.add(httpServletRequest, salary, joinedDate, bDay, email, file));
    }

    @PostMapping("/edit")
    @PreAuthorize("hasRole('ADMIN')")
    public  ResponseEntity<String> edit(HttpServletRequest httpServletRequest,
                                        @RequestParam Long empId,
                                        @RequestParam Float salary,
                                        @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date joinedDate,
                                        @RequestParam(required = false) Date bDay,
                                        @RequestParam(value = "file", required = false) MultipartFile file) throws IOException {
        return ResponseEntity.ok(employeeService.edit(httpServletRequest, empId, salary, joinedDate, bDay, file));
    }

    @DeleteMapping("/remove")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> removeEmployee(@RequestParam Long empId){
        return ResponseEntity.ok(employeeService.removeEmployee(empId));
    }

    @GetMapping("/countEmployee")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<EmployeeCountResponse> countEmployee(HttpServletRequest httpServletRequest){
        return ResponseEntity.ok(employeeService.countEmployee(httpServletRequest));
    }

    @GetMapping("/getDriverIds")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Long>> getDriverIds(HttpServletRequest httpServletRequest){
        return ResponseEntity.ok(employeeService.getDriverIds(httpServletRequest));
    }

    @GetMapping("/getConductorIds")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Long>> getConductorIds(HttpServletRequest httpServletRequest){
        return ResponseEntity.ok(employeeService.getConductorIds(httpServletRequest));
    }

}
