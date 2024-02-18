package com.example.BusBuddy.controllers;

import com.example.BusBuddy.Exception.BusNotFoundException;
import com.example.BusBuddy.dto.Bus.BusAddRequest;
import com.example.BusBuddy.dto.Bus.BusAddResponse;
import com.example.BusBuddy.dto.Bus.BusEditRequest;
import com.example.BusBuddy.dto.Bus.BusPaginationResponse;
import com.example.BusBuddy.models.Bus;
import com.example.BusBuddy.services.BusService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1")
public class BusController {
    private final BusService busService;

    @PostMapping("/bus/add")
    public ResponseEntity<BusAddResponse> add(HttpServletRequest httpRequest, @RequestBody BusAddRequest request){
        return busService.add(httpRequest,request);
    }

    @GetMapping("/bus/findById")
    public ResponseEntity<Bus> findById(@RequestParam Long busId) throws BusNotFoundException {
        return busService.findByBusId(busId);
    }

    @PostMapping("/bus/edit")
    public ResponseEntity<Bus> edit(@RequestBody BusEditRequest request) throws BusNotFoundException {
        return busService.editBus(request);
    }

    @GetMapping("/bus/findAll")
    public ResponseEntity<BusPaginationResponse> findAll(@RequestParam(value = "pageNo", defaultValue = "0" , required = false) int pageNumber,
                                                         @RequestParam(value = "pageSize", defaultValue = "5" , required = false)int pageSize) {
        return busService.findAll(pageNumber , pageSize);
    }
}
