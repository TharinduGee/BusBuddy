package com.example.BusBuddy.services;

import com.example.BusBuddy.Exception.EntityNotFoundException;
import com.example.BusBuddy.dto.Employee.EmployeeAddRequest;
import com.example.BusBuddy.dto.Employee.EmployeeEditReq;
import com.example.BusBuddy.dto.Employee.EmployeeResponse;
import com.example.BusBuddy.models.Business;
import com.example.BusBuddy.models.Employee;
import com.example.BusBuddy.models.User;
import com.example.BusBuddy.repositories.BusinessRepository;
import com.example.BusBuddy.repositories.EmployeeRepository;
import com.example.BusBuddy.repositories.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
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
    private final UserRepository userRepository;

    @Transactional
    public EmployeeResponse save(HttpServletRequest httpRequest , EmployeeAddRequest request){
        Business business = businessService.extractBId(httpRequest);
        Employee employee = Employee.builder()
                .designation(request.getDesignation())
                .salary(request.getSalary())
                .bDay(request.getBDay())
                .name(request.getName())
                .joinedDate(request.getJoinedDate())
                .business(business)
                .build();

        employeeRepository.save(employee);
        User user = userRepository.findByEmail(request.getEmail()).orElseThrow(()->new EntityNotFoundException("User Not found."));
        user.setEmployee(employee);
        user.setBusiness(business);
        userRepository.save(user);

        return modelMapper.map(employee, EmployeeResponse.class);
    }

    public ResponseEntity<String> editEmployee(EmployeeEditReq request){
        Employee info = employeeRepository.findById(request.getEmpId())
                .orElseThrow(() -> new EntityNotFoundException("Employee not found with id : " + request.getEmpId()
                ));
        info.setSalary(request.getSalary());
        info.setSalary(request.getSalary());

        employeeRepository.save(info);

        return ResponseEntity.status(HttpStatus.OK).body("Edited successfully");
    }

    public ResponseEntity<String> removeEmployee(Long empId){
        employeeRepository.deleteById(empId);
        return ResponseEntity.status(HttpStatus.OK).body("Successfully Deleted.");
    }
}
