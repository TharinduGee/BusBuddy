package com.example.BusBuddy.repositories;

import com.example.BusBuddy.models.Business;
import com.example.BusBuddy.models.Employee;
import com.example.BusBuddy.models.EmployeeType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    Page<Employee> findByBusiness(Business business , Pageable pageable);

    Long countByBusiness(Business business);
    Long countByBusinessAndDesignation(Business business, EmployeeType type);
    Page<Employee> findByBusinessAndNameContainingIgnoreCase(Business business , String firstName , Pageable pageable);

//    @Query("SELECT e.empId FROM employee e WHERE e.business = ?1 AND e.designation = ?2")
//    List<Long> findByBusinessAndDesignation(Business business , EmployeeType designation);

    List<Employee> findByBusinessAndDesignation(Business business , EmployeeType designation);


}
