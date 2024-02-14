package com.example.BusBuddy.services;

import com.example.BusBuddy.dto.Employee.EmployeeAddRequest;
import com.example.BusBuddy.dto.Employee.EmployeeEditReq;
import com.example.BusBuddy.dto.Employee.EmployeeResponse;
import com.example.BusBuddy.models.Employee;
import com.example.BusBuddy.repositories.BusinessRepository;
import com.example.BusBuddy.repositories.EmployeeRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final BusinessService businessService;
    private final ModelMapper modelMapper;


    public EmployeeResponse save(HttpServletRequest httpRequest , EmployeeAddRequest request){
        Employee employee = Employee.builder()
                .designation(request.getDesignation())
                .salary(request.getSalary())
                .bDay(request.getBDay())
                .name(request.getName())
                .joinedDate(request.getJoinedDate())
                .user(request.getUser())
                .business(businessService.extractBId(httpRequest))
                .build();
        EmployeeResponse response = modelMapper.map(employeeRepository.save(employee), EmployeeResponse.class);
        return response;
    }

    public ResponseEntity<String> editEmployee(EmployeeEditReq request){
        Employee info = employeeRepository.findById(request.getEmpId())
                .orElseThrow(() -> new RuntimeException("Employee not found with id : " + request.getEmpId()
                ));
        info.setBDay(request.getBDay());
        info.setImageData(request.getImageData());
        info.setSalary(request.getSalary());

        Employee employee  = employeeRepository.save(info);

        return ResponseEntity.status(HttpStatus.OK).body("Edited successfully");
    }
}
