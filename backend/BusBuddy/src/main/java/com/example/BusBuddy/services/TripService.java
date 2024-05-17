package com.example.BusBuddy.services;

import com.example.BusBuddy.Exception.EntityNotFoundException;
import com.example.BusBuddy.dto.Trip.*;

import com.example.BusBuddy.models.*;
import com.example.BusBuddy.repositories.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import static io.debezium.relational.mapping.ColumnMappers.build;

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
    public String addTripsForDuration(HttpServletRequest httpServletRequest, @RequestBody @NotNull TripAddForDurationRequest tripAddForDurationRequest ) {
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

        return "The trips are scheduled successfully.";
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
        if(tripAddRequest.getConductorId() != null){
            conductor = employeeRepository.findById(tripAddRequest.getConductorId())
                    .orElseThrow(() -> new EntityNotFoundException("Conductor is not found"));
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
                .income(tripAddRequest.getIncome())
                .expense(tripAddRequest.getExpense())
                .status(TripStatus.TRIP_STATUS_SCHEDULED)
                .bus(bus)
                .conductor(conductor)
                .driver(driver)
                .route(route)
                .ticketApi(tripAddRequest.getTicketApiToken())
                .business(businessService.extractBId(httpServletRequest))
                .build();

        tripRepository.save(trip);

    }

    public String addTrip(HttpServletRequest httpServletRequest, @RequestBody @NotNull TripAddRequest tripAddRequest , @RequestParam LocalDate date){
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
        if(tripAddRequest.getConductorId() != null){
            conductor = employeeRepository.findById(tripAddRequest.getConductorId())
                    .orElseThrow(() -> new EntityNotFoundException("Conductor is not found"));
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
                .income(tripAddRequest.getIncome())
                .expense(tripAddRequest.getExpense())
                .status(TripStatus.TRIP_STATUS_SCHEDULED)
                    .conductor(conductor)
                    .driver(driver)
                    .route(route)
                .ticketApi(tripAddRequest.getTicketApiToken())
                    .business(businessService.extractBId(httpServletRequest))
                    .build();

        tripRepository.save(trip);

        return "Trip is scheduled successfully";
    }


    public String remove(@RequestParam Long tripId){
        tripRepository.deleteById(tripId);
        return "Trip is successfully deleted";
    }

    public List<TripResponseForEmployee> findTripForEmployee(HttpServletRequest httpServletRequest, LocalDate date){
        Employee employee = employeeService.extractEmpId(httpServletRequest);
        List<Trip> trips = tripRepository.findByDateAndDriver(date , employee);
        List<TripResponseForEmployee> tripResponseList ;
        if(employee.getDesignation() == EmployeeType.EMPLOYEE_TYPE_DRIVER){
            tripResponseList = trips.stream().map(
                            trip -> TripResponseForEmployee.builder()
                                    .tripId(trip.getTripId())
                                    .startDestination(trip.getRoute() != null ? trip.getRoute().getStartDestination() : null)
                                    .endDestination(trip.getRoute() != null ? trip.getRoute().getEndDestination() : null)
                                    .startTime(trip.getStartTime())
                                    .numberPlate(trip.getBus() != null ? trip.getBus().getNumberPlate() : null)
                                    .endTime(trip.getEndTime())
                                    .employeeName(trip.getConductor() != null ? trip.getConductor().getName() : null)
                                    .status(trip.getStatus())
                                    .build())
                    .toList();
        }
        else if(employee.getDesignation() == EmployeeType.EMPLOYEE_TYPE_CONDUCTOR){
            tripResponseList = trips.stream().map(
                            trip -> TripResponseForEmployee.builder()
                                    .tripId(trip.getTripId())
                                    .startDestination(trip.getRoute() != null ? trip.getRoute().getStartDestination() : null)
                                    .endDestination(trip.getRoute() != null ? trip.getRoute().getEndDestination() : null)
                                    .numberPlate(trip.getBus() != null ? trip.getBus().getNumberPlate() : null)
                                    .startTime(trip.getStartTime())
                                    .endTime(trip.getEndTime())
                                    .employeeName(trip.getDriver() != null ? trip.getDriver().getName() : null)
                                    .status(trip.getStatus())
                                    .build())
                    .toList();
        }else{
            throw new InternalError("Employee type can't be identified.");
        }

        return  tripResponseList;
    }

    @Transactional
    public TripPaginationResponse findTrips(HttpServletRequest httpServletRequest ,
                                                            int pageNumber,
            int pageSize
            , LocalDate startDate
            , LocalDate endDate
    ){
        Pageable pageable = PageRequest.of(pageNumber,pageSize);
        Page<Trip> tripPage;

        tripPage = tripRepository.findByBusinessAndDateBetween(
                businessService.extractBId(httpServletRequest),
                startDate,endDate,pageable
        );
       List<Trip> trips = tripPage.getContent();

       List<TripResponse> tripResponseList = trips.stream().map(
               trip -> TripResponse.builder()
                       .tripId(trip.getTripId())
                       .startDestination(trip.getRoute() != null ? trip.getRoute().getStartDestination() : null)
                       .endDestination(trip.getRoute() != null ? trip.getRoute().getEndDestination() : null)
                       .busId(trip.getBus() != null ? trip.getBus().getBusId() : null)
                       .driverId(trip.getDriver() != null ? trip.getDriver().getEmpId() : null)
                       .conductorId(trip.getConductor() != null ? trip.getConductor().getEmpId() : null)
                       .status(trip.getStatus())
                       .startTime(trip.getStartTime())
                       .endTime(trip.getEndTime())
                       .income(trip.getIncome())
                       .expense(trip.getExpense())
                       .routeId(trip.getRoute() != null ? trip.getRoute().getRouteId() : null)
                       .date(trip.getDate())
                       .build()
       ).toList();

       TripPaginationResponse tripPaginationResponse = TripPaginationResponse.builder()
               .content(tripResponseList)
                .pageSize(tripPage.getSize())
                .pageNo(tripPage.getNumber())
                .totalElements(tripPage.getTotalElements())
                .totalPages(tripPage.getTotalPages())
                .last(tripPage.isLast())
               .build();

        return  tripPaginationResponse;
    }


    @Scheduled(fixedRate = 60000)// check every 1 minutes
    public void checkTrips(){
        Time currentTime = Time.valueOf(LocalTime.now());
        LocalDate date = LocalDate.now();
        List<Trip> trips = tripRepository.findByDateAndStartTimeBefore(date, currentTime);
        for(Trip trip : trips){
            if(trip.getEndTime().before(currentTime) ){
                if(trip.getStatus() != TripStatus.TRIP_STATUS_COMPLETED){
                    System.out.println("Completed .");
                    trip.setStatus(TripStatus.TRIP_STATUS_COMPLETED);
                    tripRepository.save(trip);
                    System.out.println("Trip is over.");

                    //ledgerService.addTripLedgerEntry(trip);
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