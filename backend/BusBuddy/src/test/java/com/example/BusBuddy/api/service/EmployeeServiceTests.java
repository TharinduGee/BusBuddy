package com.example.BusBuddy.api.service;

import com.example.BusBuddy.Exception.EntityNotFoundException;
import com.example.BusBuddy.dto.Employee.EmployeePaginationResponse;
import com.example.BusBuddy.models.Business;
import com.example.BusBuddy.models.Employee;
import com.example.BusBuddy.models.Role;
import com.example.BusBuddy.models.User;
import com.example.BusBuddy.repositories.EmployeeRepository;
import com.example.BusBuddy.repositories.UserRepository;
import com.example.BusBuddy.services.BusinessService;
import com.example.BusBuddy.services.EmployeeService;
import jakarta.servlet.http.HttpServletRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.web.multipart.MultipartFile;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.MockitoJUnitRunner;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;


@RunWith(MockitoJUnitRunner.class)
public class EmployeeServiceTests {
    @Mock
    private EmployeeRepository employeeRepository;

    @Mock
    private BusinessService businessService;

    @Mock
    private UserRepository userRepository;
    @Mock
    private ModelMapper modelMapper;

    @InjectMocks
    private EmployeeService employeeService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testFindAll_contentCountCheck() {

        HttpServletRequest httpServletRequest = mock(HttpServletRequest.class);
        MultipartFile multipartFile = mock(MultipartFile.class);
        Date joinedDate = new Date();
        Date bDay = new Date();


        List<Employee> employees = new ArrayList<>();
        employees.add(new Employee());
        Page<Employee> page = mock(Page.class);
        when(page.getContent()).thenReturn(employees);
        when(employeeRepository.findAll(any(Pageable.class))).thenReturn(page);


        EmployeePaginationResponse response = employeeService.findAll(0, 10);
        assertEquals(1, response.getContent().size());
    }

    @Test
    void testFindEmployees_byName() {

        List<Employee> employees = new ArrayList<>();
        Employee newEmployee = Employee.builder().name("John").build();
        employees.add(newEmployee);
        Page<Employee> page = mock(Page.class);
        when(page.getContent()).thenReturn(employees);
        //when(page.getContent().get(0).getName()).thenReturn("John");
        when(employeeRepository.findByBusinessAndNameContainingIgnoreCase(any(), anyString(), any(Pageable.class))).thenReturn(page);


        EmployeePaginationResponse response = employeeService.findEmployees(mock(HttpServletRequest.class), "John", 0, 10);
        assertEquals(1, response.getContent().size());
        //assertEquals("John",response.getContent().get(0).getName());
    }

    @Test
    void testAddEmployee_Success() {

        User user = new User();
        user.setRole(Role.ROLE_DRIVER);
        when(userRepository.findByEmail(anyString())).thenReturn(Optional.of(user));
        HttpServletRequest httpServletRequest = mock(HttpServletRequest.class);
        when(userRepository.findByEmail(anyString())).thenReturn(Optional.of(user));
        when(businessService.extractBId(any())).thenReturn(new Business());


        String result = employeeService.add(httpServletRequest, 1000.0f, new Date(), new Date(), "test@example.com", mock(MultipartFile.class));
        assertEquals("User enrolled to the business as a employee.", result);
    }

    @org.junit.Test(expected = EntityNotFoundException.class)
    public void testRemoveEmployee_NotFound() throws Exception {
        Long empId = 1L;

        when(employeeRepository.findById(empId)).thenReturn(Optional.empty());

        employeeService.removeEmployee(empId);
    }
}

