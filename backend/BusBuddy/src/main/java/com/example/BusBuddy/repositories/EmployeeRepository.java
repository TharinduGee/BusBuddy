package com.example.BusBuddy.repositories;

import com.example.BusBuddy.models.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    Optional<Employee> findById(Long emp_Id);
}
