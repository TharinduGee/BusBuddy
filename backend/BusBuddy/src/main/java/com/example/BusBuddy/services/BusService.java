package com.example.BusBuddy.services;

import com.example.BusBuddy.Exception.EntityNotFoundException;
import com.example.BusBuddy.dto.Bus.*;
import com.example.BusBuddy.dto.Route.RoutePaginationResponse;
import com.example.BusBuddy.dto.Route.RouteResponse;
import com.example.BusBuddy.models.*;
import com.example.BusBuddy.repositories.BusRepository;
import com.example.BusBuddy.repositories.BusinessRepository;
import com.example.BusBuddy.repositories.DocumentRepository;
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

    @Transactional
    public ResponseEntity<String> add(HttpServletRequest httpServletRequest,
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

        return ResponseEntity.ok("Bus added successfully.");
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
            documentRepository.save(document);
        }else if(file != null){
            documentService.add(file,httpServletRequest,
                    DocCategory.DOC_CATEGORY_ROUTE_PERMIT,
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


    public ResponseEntity<Bus> findByBusId(Long busId ) {
        Bus bus = busRepository.findById(busId)
                .orElseThrow(()-> new EntityNotFoundException("Bus not found"));

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

//    public ResponseEntity<List<Long>> findAllByBusiness(int pageNumber, int pageSize){
//        Pageable pageable = PageRequest.of(pageNumber, pageSize);
//        List<Bus> = busRepository.findByBusiness(bus);
//
//        List<BusResponse> busResponses = buses.stream()
//                .map(bus ->
//                        BusResponse.builder()
//                                .busId(bus.getBusId())
//                                .lastServiceDate(bus.getLastServiceDate())
//                                .numberPlate(bus.getNumberPlate())
//                                .regNo(bus.getRegNo())
//                                .type(bus.getType())
//                                .seats(bus.getSeats())
//                                .docId(bus.getDocument() != null ? bus.getDocument().getDocId() : null)
//                                .docName(bus.getDocument() != null ? bus.getDocument().getDocName() : null)
//                                .build()
//                )
//                .toList();
//
//
//
//        return ResponseEntity.ok(busPaginationResponse);
//    }

    public ResponseEntity<Long> countBus(HttpServletRequest httpServletRequest){
        Business business = businessService.extractBId(httpServletRequest);
        Long count = busRepository.countByBusiness(business);
        return ResponseEntity.ok(count);
    }
}
