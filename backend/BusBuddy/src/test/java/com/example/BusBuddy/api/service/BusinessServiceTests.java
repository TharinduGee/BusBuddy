package com.example.BusBuddy.api.service;

import com.example.BusBuddy.dto.Authentication.BusinessEditInfoReq;
import com.example.BusBuddy.dto.Business.BusinessInfo;
import com.example.BusBuddy.models.Business;
import com.example.BusBuddy.repositories.BusinessRepository;
import com.example.BusBuddy.services.BusinessService;
import jakarta.servlet.http.HttpServletRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class BusinessServiceTests {
    @Mock
    private BusinessRepository businessRepository;

    @InjectMocks
    private BusinessService businessService;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
    }


    @Test
    public void saveBusiness_Success() {
        Business newBusiness = new Business();
        when(businessRepository.save(newBusiness)).thenReturn(newBusiness);
        Business savedBusiness = businessService.save(newBusiness);
        assertEquals(newBusiness, savedBusiness);
    }

    @Test
    public void editInfo_Success() {
        HttpServletRequest httpServletRequest = mock(HttpServletRequest.class);
        BusinessEditInfoReq request = new BusinessEditInfoReq();
        Business business = new Business();
        business.setBName("Old Name");

        when(httpServletRequest.getAttribute("b_id")).thenReturn("123");

        when(businessRepository.findBybId(anyLong())).thenReturn(java.util.Optional.of(business));

        String newBusinessName = "New Name";
        request.setBusinessName(newBusinessName);
        String result = businessService.editInfo(httpServletRequest, request);

        assertEquals("Edited successfully", result);
        assertEquals(newBusinessName, business.getBName());
    }

    @Test
    public void getInfo_Success() {
        HttpServletRequest httpServletRequest = mock(HttpServletRequest.class);
        Business business = new Business();
        business.setBName("Test Business");
        business.setEmail("test@example.com");
        business.setRegistrationNo("123456");
        business.setAddress("Test Address");

        // Set up HttpServletRequest mock to provide a non-null value for "b_id" attribute
        when(httpServletRequest.getAttribute("b_id")).thenReturn("123"); // Change "123" to a valid business ID

        when(businessRepository.findBybId(anyLong())).thenReturn(java.util.Optional.of(business));

        BusinessInfo businessInfo = businessService.getInfo(httpServletRequest);

        assertEquals(business.getBName(), businessInfo.getBusinessName());
        assertEquals(business.getEmail(), businessInfo.getEmail());
        assertEquals(business.getRegistrationNo(), businessInfo.getRegistrationNo());
        assertEquals(business.getAddress(), businessInfo.getAddress());
    }



}
