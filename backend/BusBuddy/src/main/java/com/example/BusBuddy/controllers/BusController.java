package com.example.BusBuddy.controllers;


import com.example.BusBuddy.dto.Bus.BusAddRequest;
import com.example.BusBuddy.dto.Bus.BusAddResponse;
import com.example.BusBuddy.dto.Bus.BusEditRequest;
import com.example.BusBuddy.dto.Bus.BusPaginationResponse;
import com.example.BusBuddy.dto.Route.RoutePaginationResponse;
import com.example.BusBuddy.models.Bus;
import com.example.BusBuddy.models.BusType;
import com.example.BusBuddy.services.BusService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.EntityNotFoundException;
import java.io.IOException;
import java.util.Date;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/bus")
@CrossOrigin(origins = "http://localhost:3000")
public class BusController {
    private final BusService busService;

    @PostMapping("/add")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> add(HttpServletRequest httpServletRequest,
                                      @RequestParam BusType type,
                                      @RequestParam String numberPlate,
                                      @RequestParam(required = false) Date lastServicedDate,
                                      @RequestParam(required = false)  int seats,
                                      @RequestParam(required = false)  String regNo,
                                      @RequestParam(value = "file", required = false) MultipartFile file) throws IOException {
        return busService.add(httpServletRequest, type, numberPlate, lastServicedDate, seats, regNo, file);
    }

    @GetMapping("/findById")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Bus> findById(@RequestParam Long busId)  {
        return busService.findByBusId(busId);
    }


    @PostMapping("/edit")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Bus> edit(@RequestBody @Valid BusEditRequest request)  {
        return busService.editBus(request);
    }

    @GetMapping("/findAll")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<BusPaginationResponse> findAll(@RequestParam(value = "pageNo", defaultValue = "0" , required = false) int pageNumber,
                                                         @RequestParam(value = "pageSize", defaultValue = "5" , required = false)int pageSize) {
        return busService.findAll(pageNumber , pageSize);
    }

    @GetMapping("/findBuses")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<BusPaginationResponse> findRoutes(HttpServletRequest httpServletRequest,
                                                              @RequestParam(value = "pageNo", defaultValue = "0" , required = false)int pageNumber,
                                                              @RequestParam(value = "pageSize", defaultValue = "5" , required = false)int pageSize,
                                                              @RequestParam(required = false) String numberPlate
    ){
        return busService.findBuses(httpServletRequest, pageNumber, pageSize, numberPlate);
    }

    @GetMapping("/count")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Long> countBus(HttpServletRequest httpServletRequest) {
        return busService.countBus(httpServletRequest);
    }
}
