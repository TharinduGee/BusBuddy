package com.example.BusBuddy.controllers;

import com.example.BusBuddy.models.Bus;
import com.example.BusBuddy.services.BusService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1")
public class BusController {
    private final BusService busService;

    @PostMapping("/bus/add")
    public ResponseEntity<Bus> add(@RequestBody Bus bus){
        return busService.add(bus);
    }
}
