package com.example.BusBuddy.services;

import com.example.BusBuddy.dto.Employee.EmployeeEditReq;
import com.example.BusBuddy.models.Employee;
import com.example.BusBuddy.repositories.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

    public Employee save(Employee newEmployee){
        return employeeRepository.save(newEmployee);
    }

    public ResponseEntity<String> editEmployee(EmployeeEditReq request){
        Employee info = employeeRepository.findById(request.getEmpId())
                .orElseThrow(() -> new RuntimeException("Employee not found with id : " + request.getEmpId()
                ));
        info.setBDay(request.getBDay());
        info.setImageData(request.getImageData());
        info.setSalary(request.getSalary());

        Employee employee  = this.save(info);

        return ResponseEntity.status(HttpStatus.OK).body("Edited successfully");
    }
}
