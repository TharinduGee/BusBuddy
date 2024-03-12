package com.example.BusBuddy.services;

import com.example.BusBuddy.Exception.EntityNotFoundException;
import com.example.BusBuddy.dto.Trip.TripAddForDurationRequest;

import com.example.BusBuddy.dto.Trip.TripAddRequest;
import com.example.BusBuddy.dto.Trip.TripResponse;
import com.example.BusBuddy.models.*;
import com.example.BusBuddy.repositories.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TripService {
    private final TripRepository tripRepository;
    private final BusinessService businessService;
    private final BusRepository busRepository;
    private final EmployeeRepository employeeRepository;
    private final RouteRepository routeRepository;
    private final EmployeeService employeeService;
    private final LedgerService ledgerService;

    @Transactional
    public ResponseEntity<String> addTripsForDuration(HttpServletRequest httpServletRequest, @RequestBody @NotNull TripAddForDurationRequest tripAddForDurationRequest ) {
        LocalDate firstDate = tripAddForDurationRequest.getFirstDate();
        LocalDate lastDate = tripAddForDurationRequest.getLastDate();

        LocalDate currentDate = firstDate;
        while(!currentDate.isAfter(lastDate)){
            addSingleTrip(httpServletRequest ,
                    tripAddForDurationRequest.getTripAddRequest(),
                    currentDate
            );
            currentDate = currentDate.plusDays(1);
        }

        return ResponseEntity.status(HttpStatus.OK).body("The trips are scheduled successfully.");
    }

    private void addSingleTrip(HttpServletRequest httpServletRequest, @RequestBody @NotNull TripAddRequest tripAddRequest , @RequestParam LocalDate localDate){
        Bus bus;
        Employee driver;
        Employee conductor;
        Route route;
        if(tripAddRequest.getBusId() != null){
            bus = busRepository.findById(tripAddRequest.getBusId())
                    .orElseThrow(()->new EntityNotFoundException("Bus is not found"));
        }else{
            bus = null;
        }
        if(tripAddRequest.getDriverId() != null){
            driver = employeeRepository.findById(tripAddRequest.getDriverId())
                    .orElseThrow(() -> new EntityNotFoundException("Driver is not found"));
        }else{
            driver = null;
        }
        if(tripAddRequest.getCondocterId() != null){
            conductor = employeeRepository.findById(tripAddRequest.getCondocterId())
                    .orElseThrow(() -> new EntityNotFoundException("Driver is not found"));
        }else{
            conductor = null;
        }
        if(tripAddRequest.getRouteId() != null){
            route = routeRepository.findById(tripAddRequest.getRouteId())
                    .orElseThrow(() -> new EntityNotFoundException("Route is not found"));
        }else{
            route = null;
        }

        Trip trip = Trip.builder()
                .date(localDate)
                .startTime(tripAddRequest.getStartTime())
                .endTime(tripAddRequest.getEndTime())
                .income(0)
                .expense(0)
                .status(TripStatus.TRIP_STATUS_SCHEDULED)
                .bus(bus)
                .conductor(conductor)
                .driver(driver)
                .route(route)
                .business(businessService.extractBId(httpServletRequest))
                .build();

        tripRepository.save(trip);

    }

    public ResponseEntity<String> addTrip(HttpServletRequest httpServletRequest, @RequestBody @NotNull TripAddRequest tripAddRequest , @RequestParam LocalDate date){
        Bus bus;
        Employee driver;
        Employee conductor;
        Route route;
        if(tripAddRequest.getBusId() != null){
             bus = busRepository.findById(tripAddRequest.getBusId())
                    .orElseThrow(()->new EntityNotFoundException("Bus is not found"));
        }else{
            bus = null;
        }
        if(tripAddRequest.getDriverId() != null){
             driver = employeeRepository.findById(tripAddRequest.getDriverId())
                    .orElseThrow(() -> new EntityNotFoundException("Driver is not found"));
        }else{
            driver = null;
        }
        if(tripAddRequest.getCondocterId() != null){
            conductor = employeeRepository.findById(tripAddRequest.getCondocterId())
                    .orElseThrow(() -> new EntityNotFoundException("Driver is not found"));
        }else{
            conductor = null;
        }
        if(tripAddRequest.getRouteId() != null){
            route = routeRepository.findById(tripAddRequest.getRouteId())
                    .orElseThrow(() -> new EntityNotFoundException("Route is not found"));
        }else{
            route = null;
        }

        Trip trip = Trip.builder()
                    .date(date)
                    .startTime(tripAddRequest.getStartTime())
                    .endTime(tripAddRequest.getEndTime())
                    .bus(bus)
                .income(0)
                .expense(0)
                .status(TripStatus.TRIP_STATUS_SCHEDULED)
                    .conductor(conductor)
                    .driver(driver)
                    .route(route)
                    .business(businessService.extractBId(httpServletRequest))
                    .build();

        tripRepository.save(trip);

        return ResponseEntity.status(HttpStatus.OK).body("Trip is scheduled successfully");
    }


    public ResponseEntity<String> remove(@RequestParam Long tripId){
        tripRepository.deleteById(tripId);
        return ResponseEntity.status(HttpStatus.OK).body("Trip is successfully deleted");
    }

    public ResponseEntity<List<TripResponse>> findTripForEmployee(HttpServletRequest httpServletRequest,LocalDate date){
        Employee employee = employeeService.extractEmpId(httpServletRequest);
        List<Trip> trips = tripRepository.findByDateAndDriver(date , employee);
        List<TripResponse> tripResponseList ;
        if(employee.getDesignation() == EmployeeType.EMPLOYEE_TYPE_DRIVER){
            tripResponseList = trips.stream().map(
                            trip -> TripResponse.builder()
                                    .startDestination(trip.getRoute() != null ? trip.getRoute().getStartDestination() : null)
                                    .endDestination(trip.getRoute() != null ? trip.getRoute().getEndDestination() : null)
                                    .startTime(trip.getStartTime())
                                    .endTime(trip.getEndTime())
                                    .employeeName(trip.getConductor() != null ? trip.getConductor().getName() : null)
                                    .status(trip.getStatus())
                                    .build())
                    .toList();
        }
        else if(employee.getDesignation() == EmployeeType.EMPLOYEE_TYPE_CONDUCTOR){
            tripResponseList = trips.stream().map(
                            trip -> TripResponse.builder()
                                    .startDestination(trip.getRoute() != null ? trip.getRoute().getStartDestination() : null)
                                    .endDestination(trip.getRoute() != null ? trip.getRoute().getEndDestination() : null)
                                    .startTime(trip.getStartTime())
                                    .endTime(trip.getEndTime())
                                    .employeeName(trip.getDriver() != null ? trip.getDriver().getName() : null)
                                    .status(trip.getStatus())
                                    .build())
                    .toList();
        }else{
            throw new InternalError("Employee type can't be identified.");
        }

        return  ResponseEntity.status(HttpStatus.OK).body(tripResponseList);
    }





    @Scheduled(fixedRate = 300000)// check every 5 minutes
    public void checkTrips(){
        Time currentTime = Time.valueOf(LocalTime.now());
        LocalDate date = LocalDate.now();
        List<Trip> trips = tripRepository.findByDateAndStartTimeBefore(date, currentTime);
        for(Trip trip : trips){
            if(trip.getEndTime().before(currentTime) ){
                if(trip.getStatus() != TripStatus.TRIP_STATUS_COMPLETED){
                    trip.setStatus(TripStatus.TRIP_STATUS_COMPLETED);
                    tripRepository.save(trip);
                    System.out.println("Trip is over.");

                    ledgerService.addTripLedgerEntry(trip);
                }
            }else{
                if(trip.getStatus() == TripStatus.TRIP_STATUS_SCHEDULED){
                    trip.setStatus(TripStatus.TRIP_STATUS_ONGOING);
                    tripRepository.save(trip);
                    System.out.println("Trip is ongoing.");
                }
            }
        }
    }

}