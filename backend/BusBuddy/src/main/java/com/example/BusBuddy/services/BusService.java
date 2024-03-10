package com.example.BusBuddy.services;

import com.example.BusBuddy.Exception.EntityNotFoundException;
import com.example.BusBuddy.dto.Bus.*;
import com.example.BusBuddy.dto.Route.RoutePaginationResponse;
import com.example.BusBuddy.dto.Route.RouteResponse;
import com.example.BusBuddy.models.Bus;
import com.example.BusBuddy.models.Business;
import com.example.BusBuddy.models.Route;
import com.example.BusBuddy.repositories.BusRepository;
import com.example.BusBuddy.repositories.BusinessRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BusService {
    private final BusRepository busRepository;
    private final BusinessService businessService;
    private final ModelMapper modelMapper;

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

    public ResponseEntity<Bus> findByBusId(Long busId ) {
        Bus bus = busRepository.findById(busId)
                .orElseThrow(()-> new EntityNotFoundException("Bus not found"));

        return ResponseEntity.ok(bus);
    }

    public ResponseEntity<Bus> editBus(BusEditRequest request) {
        Bus bus = busRepository.findById(request.getBusId())
                .orElseThrow(() -> new EntityNotFoundException("Bus not found"));
        bus.setSeats(request.getSeats());
        bus.setNumberPlate(request.getNumberPlate());
        bus.setRegNo(request.getRegNo());
        bus.setType(request.getType());

        Bus editedBus = busRepository.save(bus);

        return ResponseEntity.ok(bus);
    }

    @Transactional
    public ResponseEntity<BusPaginationResponse> findBuses(
            HttpServletRequest httpServletRequest,
            int pageNumber,
            int pageSize,
            String numberPlate){
        Pageable pageable = PageRequest.of(pageNumber, pageSize);
        Page<Bus> busPage;
        if(numberPlate != null && !numberPlate.isEmpty()){
            busPage =
                    busRepository.findByBusinessAndNumberPlateContainingIgnoreCase(
                            businessService.extractBId(httpServletRequest) ,
                            numberPlate,
                            pageable
                    );
        }else{
            busPage =
                    busRepository.findByBusiness(
                            businessService.extractBId(httpServletRequest),
                            pageable
                    );
        }

        List<Bus> buses = busPage.getContent();
        List<BusResponse> busResponses = buses.stream()
                .map(bus ->
                        BusResponse.builder()
                                .busId(bus.getBusId())
                                .lastServiceDate(bus.getLastServiceDate())
                                .numberPlate(bus.getNumberPlate())
                                .regNo(bus.getRegNo())
                                .type(bus.getType())
                                .seats(bus.getSeats())
                                .docId(bus.getDocument() != null ? bus.getDocument().getDocId() : null)
                                .docName(bus.getDocument() != null ? bus.getDocument().getDocName() : null)
                                .build()
                )
                .toList();

        BusPaginationResponse busPaginationResponse = BusPaginationResponse.builder()
                .content(busResponses)
                .pageSize(busPage.getSize())
                .pageNo(busPage.getNumber())
                .totalElements(busPage.getTotalElements())
                .totalPages(busPage.getTotalPages())
                .last(busPage.isLast())
                .build();

        return ResponseEntity.status(HttpStatus.OK).body(busPaginationResponse);

    }

    public ResponseEntity<BusPaginationResponse> findAll(int pageNumber, int pageSize){
        Pageable pageable = PageRequest.of(pageNumber, pageSize);
        Page<Bus> busPage = busRepository.findAll(pageable);

        List<Bus> buses = busPage.getContent();
        List<BusResponse> busResponses = buses.stream()
                .map((element) -> modelMapper.map(element, BusResponse.class))
                .collect(Collectors.toList());

        BusPaginationResponse busPaginationResponse = BusPaginationResponse.builder()
                .content(busResponses)
                .pageSize(busPage.getSize())
                .pageNo(busPage.getNumber())
                .totalElements(busPage.getTotalElements())
                .totalPages(busPage.getTotalPages())
                .last(busPage.isLast()).build();

        return ResponseEntity.ok(busPaginationResponse);
    }

    public ResponseEntity<Long> countBus(HttpServletRequest httpServletRequest){
        Business business = businessService.extractBId(httpServletRequest);
        Long count = busRepository.countByBusiness(business);
        return ResponseEntity.ok(count);
    }
}
