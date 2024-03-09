package com.example.BusBuddy.services;

import com.example.BusBuddy.Exception.EntityNotFoundException;
import com.example.BusBuddy.dto.Employee.*;
import com.example.BusBuddy.models.*;
import com.example.BusBuddy.repositories.EmployeeRepository;
import com.example.BusBuddy.repositories.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final BusinessService businessService;
    private final ModelMapper modelMapper;
    private final UserRepository userRepository;

    public ResponseEntity<EmployeePaginationResponse> findAll(int  pageNumber , int pageSize){
        Pageable pageable = PageRequest.of(pageNumber, pageSize);
        Page<Employee> employeePage = employeeRepository.findAll(pageable);

        List<Employee> employees = employeePage.getContent();
        List<EmployeeResponse> employeeResponses = employees.stream().map((element) -> modelMapper.map(element, EmployeeResponse.class)).collect(Collectors.toList());

        EmployeePaginationResponse employeePaginationResponse = EmployeePaginationResponse.builder()
                .content(employeeResponses)
                .pageNo(employeePage.getNumber())
                .totalElements(employeePage.getTotalElements())
                .pageSize(employeePage.getSize())
                .totalPages(employeePage.getTotalPages())
                .last(employeePage.isLast())
                .build();

        return ResponseEntity.status(HttpStatus.OK).body(employeePaginationResponse);
    }

    @Transactional
    public ResponseEntity<EmployeePaginationResponse> findEmployees(HttpServletRequest httpServletRequest,
                                                                              String name,
                                                                              int  pageNumber , int pageSize){

        Pageable pageable = PageRequest.of(pageNumber, pageSize);
        Page<Employee> employeePage;

        if(name != null && !name.isEmpty()){
            employeePage = employeeRepository.findByBusinessAndNameContaining(
                    businessService.extractBId(httpServletRequest),
                    name , pageable);
        }else{
            employeePage = employeeRepository.findByBusiness(businessService.extractBId(httpServletRequest),
                    pageable
            );
        }

        List<Employee> employees = employeePage.getContent();
        List<EmployeeResponse> employeeResponses = employees.stream().map((element) -> modelMapper.map(element, EmployeeResponse.class)).collect(Collectors.toList());

        EmployeePaginationResponse employeePaginationResponse = EmployeePaginationResponse.builder()
                .content(employeeResponses)
                .pageNo(employeePage.getNumber())
                .totalElements(employeePage.getTotalElements())
                .pageSize(employeePage.getSize())
                .totalPages(employeePage.getTotalPages())
                .last(employeePage.isLast())
                .build();

        return ResponseEntity.status(HttpStatus.OK).body(employeePaginationResponse);
    }

    @Transactional
    public EmployeeResponse save(HttpServletRequest httpRequest ,EmployeeAddRequest request){
        Business business = businessService.extractBId(httpRequest);
        User user = userRepository.findByEmail(request.getEmail()).orElseThrow(()->new EntityNotFoundException("User Not found."));
        if(user.getEmployee() != null){
            throw new EntityNotFoundException("User is enrolled to a another business.");
        }
        Employee employee = Employee.builder()
                .designation(EmployeeType.valueOf("EMPLOYEE_TYPE_" + user.getRole().toString().substring(5)))
                .salary(request.getSalary())
                .bDay(request.getBDay())
                .name(request.getName())
                .joinedDate(request.getJoinedDate())
                .business(business)
                .build();

        employeeRepository.save(employee);

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

    public ResponseEntity<EmployeeCountResponse> countEmployee(HttpServletRequest httpServletRequest){
        Business business = businessService.extractBId(httpServletRequest);
        Long totalCount = employeeRepository.countByBusiness(business);
        Long driverCount = employeeRepository.countByBusinessAndDesignation(business , EmployeeType.EMPLOYEE_TYPE_DRIVER);
        Long conductorCount = employeeRepository.countByBusinessAndDesignation(business, EmployeeType.EMPLOYEE_TYPE_CONDUCTOR);
        EmployeeCountResponse employeeCountResponse = EmployeeCountResponse.builder().totalCount(totalCount)
                .driverCount(driverCount).conductorCount(conductorCount).build();
        return ResponseEntity.ok(employeeCountResponse);
    }


    public Employee extractEmpId(HttpServletRequest httpServletRequest){
        String str = (String) httpServletRequest.getAttribute("emp_id");
        long bId = Long.parseLong(str);
        return employeeRepository.findById(bId).orElseThrow(() -> new RuntimeException("Business not found."));
    }

}
