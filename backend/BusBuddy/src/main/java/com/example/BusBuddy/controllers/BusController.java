package com.example.BusBuddy.controllers;

import com.example.BusBuddy.Exception.EntityNotFoundExceptions.BusNotFoundException;
import com.example.BusBuddy.dto.Bus.BusAddRequest;
import com.example.BusBuddy.dto.Bus.BusAddResponse;
import com.example.BusBuddy.dto.Bus.BusEditRequest;
import com.example.BusBuddy.dto.Bus.BusPaginationResponse;
import com.example.BusBuddy.models.Bus;
import com.example.BusBuddy.services.BusService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1")
public class BusController {
    private final BusService busService;

    @PostMapping("/bus/add")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<BusAddResponse> add(HttpServletRequest httpRequest, @RequestBody @Valid BusAddRequest request){
        return busService.add(httpRequest,request);
    }

    @GetMapping("/bus/findById")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Bus> findById(@RequestParam Long busId) throws BusNotFoundException {
        return busService.findByBusId(busId);
    }


    @PostMapping("/bus/edit")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Bus> edit(@RequestBody @Valid BusEditRequest request) throws BusNotFoundException {
        return busService.editBus(request);
    }

    @GetMapping("/bus/findAll")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<BusPaginationResponse> findAll(@RequestParam(value = "pageNo", defaultValue = "0" , required = false) int pageNumber,
                                                         @RequestParam(value = "pageSize", defaultValue = "5" , required = false)int pageSize) {
        return busService.findAll(pageNumber , pageSize);
    }
}
