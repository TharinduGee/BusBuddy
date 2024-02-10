package com.example.BusBuddy.services;

import com.example.BusBuddy.models.Bus;
import com.example.BusBuddy.repositories.BusRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BusService {
    private final BusRepository busRepository;

    public ResponseEntity<Bus> add(Bus bus){
        Bus newBus = busRepository.save(bus);
        return ResponseEntity.ok(bus);
    }
}
