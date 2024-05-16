package com.example.BusBuddy.api.service;

import com.example.BusBuddy.Exception.EntityNotFoundException;
import com.example.BusBuddy.models.Bus;
import com.example.BusBuddy.models.BusType;
import com.example.BusBuddy.models.Business;
import com.example.BusBuddy.models.DocCategory;
import com.example.BusBuddy.repositories.BusRepository;
import com.example.BusBuddy.repositories.DocumentRepository;
import com.example.BusBuddy.services.BusService;
import com.example.BusBuddy.services.BusinessService;
import com.example.BusBuddy.services.DocumentService;
import jakarta.servlet.http.HttpServletRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Date;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

public class BusServiceTests {
    @Mock
    private BusRepository busRepository;

    @Mock
    private BusinessService businessService;

    @Mock
    private DocumentService documentService;

    @Mock
    private DocumentRepository documentRepository;

    @InjectMocks
    private BusService busService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }



    @Test
    void testEditBus_WithNonexistentBus() {
        HttpServletRequest httpServletRequest = mock(HttpServletRequest.class);
        MultipartFile file = new MockMultipartFile("file", new byte[0]);
        long busId = 123L;
        when(busRepository.findById(busId)).thenReturn(java.util.Optional.empty());


        assertThrows(EntityNotFoundException.class, () ->
                busService.editBus(httpServletRequest, busId, BusType.NORMAL, "123ABC",
                        new Date(), 50, "REG123", file));
    }

    @Test
    void testRemoveBus() {
        long busId = 123L;


        busService.remove(busId);

        verify(busRepository, times(1)).deleteById(busId);
    }

    @Test
    void testFindByBusId() {
        long busId = 123L; // Bus ID
        Bus expectedBus = new Bus(); // Create a dummy bus object
        when(busRepository.findById(busId)).thenReturn(java.util.Optional.of(expectedBus));

        // Test find by bus ID
        Bus actualBus = busService.findByBusId(busId);

        assertEquals(expectedBus, actualBus);
    }
}
