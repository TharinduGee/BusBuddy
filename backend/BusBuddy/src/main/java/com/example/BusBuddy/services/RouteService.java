package com.example.BusBuddy.services;

import com.example.BusBuddy.Exception.EntityNotFoundException;
import com.example.BusBuddy.dto.Route.RouteEditRequest;
import com.example.BusBuddy.dto.Route.RouteRequest;
import com.example.BusBuddy.dto.Route.RouteResponse;
import com.example.BusBuddy.models.Route;
import com.example.BusBuddy.repositories.RouteRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

@Service
@RequiredArgsConstructor
public class RouteService {
    private final RouteRepository routeRepository;
    private  final BusinessService businessService;
    private final ModelMapper modelMapper;

    public ResponseEntity<RouteResponse> add(HttpServletRequest httpServletRequest, @RequestBody RouteRequest routeRequest){
        Route route = Route.builder()
                .startDestination(routeRequest.getStartDestination())
                .endDestination(routeRequest.getEndDestination())
                .distance(routeRequest.getDistance())
                .noOfSections(routeRequest.getNoOfSections())
                .permitExpDate(routeRequest.getPermitExpDate())
                .business(businessService.extractBId(httpServletRequest))
                .build();

        route = routeRepository.save(route);
        return ResponseEntity.status(HttpStatus.OK).body(modelMapper.map(route, RouteResponse.class));
    }

    public ResponseEntity<String> edit(@RequestBody RouteEditRequest routeRequest){
        Route editedRoute = routeRepository.findById(routeRequest.getRouteId())
                .orElseThrow(()-> new EntityNotFoundException("Route Not found."));
        editedRoute.setStartDestination(routeRequest.getStartDestination());
        editedRoute.setEndDestination(routeRequest.getEndDestination());
        editedRoute.setDistance(routeRequest.getDistance());
        editedRoute.setNoOfSections(routeRequest.getNoOfSections());
        editedRoute.setPermitExpDate(routeRequest.getPermitExpDate());
        editedRoute = routeRepository.save(editedRoute);
        return  ResponseEntity.status(HttpStatus.OK).body("Successfully Edited");
    }

    public ResponseEntity<String> remove(@RequestParam long routeId){
        routeRepository.deleteById(routeId);
        return ResponseEntity.ok("Successfully Deleted");
    }
}
