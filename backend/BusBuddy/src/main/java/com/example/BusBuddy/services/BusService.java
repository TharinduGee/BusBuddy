package com.example.BusBuddy.services;

import com.example.BusBuddy.Exception.EntityNotFoundException;
import com.example.BusBuddy.dto.Bus.*;
import com.example.BusBuddy.dto.Route.RoutePaginationResponse;
import com.example.BusBuddy.dto.Route.RouteResponse;
import com.example.BusBuddy.dto.Trip.EmployeeInfo;
import com.example.BusBuddy.models.*;
import com.example.BusBuddy.repositories.BusRepository;
import com.example.BusBuddy.repositories.BusinessRepository;
import com.example.BusBuddy.repositories.DocumentRepository;
import com.example.BusBuddy.repositories.TripRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.modelmapper.ModelMapper;
import org.springframework.core.MethodParameter;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BusService {
    private final BusRepository busRepository;
    private final BusinessService businessService;
    private final DocumentService documentService;
    private final DocumentRepository documentRepository;
    private final ModelMapper modelMapper;
    private final TripRepository tripRepository;

    @Transactional
    public String add(HttpServletRequest httpServletRequest,
                                      BusType type,
                                      String numberPlate,
                                      Date lastServicedDate,
                                      int seats,
                                      String regNo,
                                      MultipartFile file) throws IOException {

        Bus bus = Bus.builder()
                .type(type)
                .seats(seats)
                .regNo(regNo)
                .numberPlate(numberPlate)
                .lastServiceDate(lastServicedDate)
                .business(businessService.extractBId(httpServletRequest))
                .build();

        busRepository.save(bus);

        if(file != null){
            documentService.add(file,httpServletRequest,
                    DocCategory.DOC_CATEGORY_BUS_DOC,
                    file.getOriginalFilename(),
                    bus.getBusId()
            );
        }

        return "Bus added successfully.";
    }

    public ResponseEntity<Bus> editBus(
            HttpServletRequest httpServletRequest,
            Long busId,
            BusType type,
            String numberPlate,
            Date lastServicedDate,
            int seats,
            String regNo,
            MultipartFile file) throws IOException {
        Bus editedBus = busRepository.findById(busId)
                .orElseThrow(()-> new EntityNotFoundException("Route Not found."));

        if(file != null && editedBus.getDocument() != null){
            Document document = editedBus.getDocument();
            document.setData(file.getBytes());
            document.setDocName(file.getOriginalFilename());
            documentRepository.save(document);
        }else if(file != null){
            documentService.add(file,httpServletRequest,
                    DocCategory.DOC_CATEGORY_BUS_DOC,
                    file.getOriginalFilename(),
                    editedBus.getBusId()
            );
        }

        editedBus.setType(type);
        editedBus.setSeats(seats);
        editedBus.setRegNo(regNo);
        editedBus.setNumberPlate(numberPlate);
        editedBus.setLastServiceDate(lastServicedDate);
        busRepository.save(editedBus);

        return  ResponseEntity.status(HttpStatus.OK).body(editedBus);
    }

    public ResponseEntity<String> remove(Long busId){
        busRepository.deleteById(busId);
        return ResponseEntity.ok("Successfully Deleted");
    }


    public Bus findByBusId(Long busId ) {
        Bus bus = busRepository.findById(busId)
                .orElseThrow(()-> new EntityNotFoundException("Bus not found"));

        return bus;
    }


    @Transactional
    public BusPaginationResponse findBuses(
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
                    busRepository.findByBusinessOrderByBusIdAsc(
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

        return busPaginationResponse;

    }

    public BusPaginationResponse findAll(int pageNumber, int pageSize){
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

        return busPaginationResponse;
    }

//    public List<Long> getBusIds(HttpServletRequest httpServletRequest){
//        Business business = businessService.extractBId(httpServletRequest);
//        List<Long> busIdList = busRepository.findByBusiness(business);
//
//        return busIdList;
//    }

    @Transactional
    public List<BusInfo> getValidBuses(HttpServletRequest httpServletRequest,
                                              LocalDate startDate , LocalDate endDate ,
                                              LocalTime startTime , LocalTime endTime){

        // if duration exceeds for another day should check other day and logic should be changed also. This should be implemented

        Business business = businessService.extractBId(httpServletRequest);
        List<Bus> allBuses = busRepository.findByBusiness(business);
        List<Bus> invalidBuses = null;
        if(startTime.isAfter(endTime)){
            invalidBuses = tripRepository.findDistinctInvalidBusesSpanMidnight(business , startDate, endDate ,startTime ,endTime, TripStatus.TRIP_STATUS_COMPLETED);
        }else{
            invalidBuses = tripRepository.findDistinctInvalidBusesNotSpanMidnight(business , startDate, endDate ,startTime ,endTime, TripStatus.TRIP_STATUS_COMPLETED);
        }


        allBuses.removeAll(invalidBuses.stream().toList());

        return allBuses.stream().map(bus -> {
            return BusInfo.builder().busId(bus.getBusId()).numberPlate(bus.getNumberPlate())
                    .seats(bus.getSeats()).build();
        }).toList();
    }

    public Long countBus(HttpServletRequest httpServletRequest){
        Business business = businessService.extractBId(httpServletRequest);
        Long count = busRepository.countByBusiness(business);
        return count;
    }
}
