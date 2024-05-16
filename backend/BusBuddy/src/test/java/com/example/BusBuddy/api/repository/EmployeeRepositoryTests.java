package com.example.BusBuddy.api.repository;

import com.example.BusBuddy.models.Employee;
import com.example.BusBuddy.models.EmployeeType;
import com.example.BusBuddy.models.Role;
import com.example.BusBuddy.models.User;
import com.example.BusBuddy.repositories.EmployeeRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class EmployeeRepositoryTests {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Test
    public void EmployeeRepository_Delete_Success(){

        Employee employee = Employee.builder()
                .designation(EmployeeType.EMPLOYEE_TYPE_DRIVER)
                .name("New employee - Driver")
                .salary((float) 35000)
                .build();

        Employee savedEmployee = employeeRepository.save(employee);
        employeeRepository.deleteById(savedEmployee.getEmpId());

        Assertions.assertThat( employeeRepository.existsById(savedEmployee.getEmpId())).isFalse();
    }

}
