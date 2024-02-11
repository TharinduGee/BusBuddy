package com.example.BusBuddy.services;

import com.example.BusBuddy.Exception.BusNotFoundException;
import com.example.BusBuddy.dto.Bus.BusAddRequest;
import com.example.BusBuddy.dto.Bus.BusAddResponse;
import com.example.BusBuddy.dto.Bus.BusEditRequest;
import com.example.BusBuddy.dto.Bus.BusPaginationResponse;
import com.example.BusBuddy.models.Bus;
import com.example.BusBuddy.repositories.BusRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BusService {
    private final BusRepository busRepository;
    private final BusinessService businessService;

    public ResponseEntity<BusAddResponse> add(HttpServletRequest httpRequest, BusAddRequest request){

        Bus newBus = Bus.builder().regNo(request.getRegNo())
                .type(request.getType()).seats(request.getSeats())
                .business(businessService.extractBId(httpRequest))
                .build();
        Bus bus = busRepository.save(newBus);
        BusAddResponse busAddResponse = BusAddResponse.builder()
                .seats(newBus.getSeats())
                .numberPlate(newBus.getNumberPlate())
                .regNo(newBus.getRegNo())
                .bId(newBus.getBusId())
                .build();
        return ResponseEntity.ok(busAddResponse);
    }

    public ResponseEntity<Bus> findByBusId(Long busId ) throws BusNotFoundException {
        Bus bus = busRepository.findById(busId)
                .orElseThrow(()-> new BusNotFoundException("Bus not found"));

        return ResponseEntity.ok(bus);
    }

    public ResponseEntity<Bus> editBus(BusEditRequest request) throws BusNotFoundException {
        Bus bus = busRepository.findById(request.getBusId())
                .orElseThrow(() -> new BusNotFoundException("Bus not found"));
        bus.setSeats(request.getSeats());
        bus.setNumberPlate(request.getNumberPlate());
        bus.setRegNo(request.getRegNo());
        bus.setType(request.getType());

        Bus editedBus = busRepository.save(bus);

        return ResponseEntity.ok(bus);
    }

    public ResponseEntity<BusPaginationResponse> findAll(int pageNumber, int pageSize){
        Pageable pageable = PageRequest.of(pageNumber, pageSize);
        Page<Bus> busPage = busRepository.findAll(pageable);

        List<Bus> buses = busPage.getContent();
        BusPaginationResponse busPaginationResponse = BusPaginationResponse.builder()
                .content(buses)
                .pageSize(busPage.getSize())
                .pageNo(busPage.getNumber())
                .totalElements(busPage.getTotalElements())
                .totalPages(busPage.getTotalPages())
                .last(busPage.isLast()).build();

        return ResponseEntity.ok(busPaginationResponse);

    }
}
