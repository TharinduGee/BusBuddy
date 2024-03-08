package com.example.BusBuddy.services;

import com.example.BusBuddy.Exception.EntityNotFoundException;
import com.example.BusBuddy.dto.Route.RouteEditRequest;
import com.example.BusBuddy.dto.Route.RoutePaginationResponse;
import com.example.BusBuddy.dto.Route.RouteRequest;
import com.example.BusBuddy.dto.Route.RouteResponse;
import com.example.BusBuddy.models.Route;
import com.example.BusBuddy.repositories.RouteRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RouteService {
    private final RouteRepository routeRepository;
    private  final BusinessService businessService;
    private final ModelMapper modelMapper;

    public ResponseEntity<RoutePaginationResponse> findRoutes(
            HttpServletRequest httpServletRequest,
            int pageNumber,
            int pageSize,
            String startDestination){
        Pageable pageable = PageRequest.of(pageNumber, pageSize);
        Page<Route> routePage;
        if(startDestination != null && !startDestination.isEmpty()){
            routePage =
                    routeRepository.findByBusinessAndStartDestinationContainingIgnoreCase(
                            businessService.extractBId(httpServletRequest) ,
                            startDestination,
                            pageable
                    );
        }else{
            routePage =
                    routeRepository.findByBusiness(
                            businessService.extractBId(httpServletRequest),
                            pageable
                    );
        }

        List<Route> routes = routePage.getContent();
        List<RouteResponse> routeResponses = routes.stream()
                .map((element) -> modelMapper.map(element, RouteResponse.class))
                .collect(Collectors.toList());

        RoutePaginationResponse routePaginationResponse = RoutePaginationResponse.builder()
                .content(routeResponses)
                .pageSize(routePage.getSize())
                .pageNo(routePage.getNumber())
                .totalElements(routePage.getTotalElements())
                .totalPages(routePage.getTotalPages())
                .last(routePage.isLast())
                .build();

        return ResponseEntity.status(HttpStatus.OK).body(routePaginationResponse);

//        if(startDestination != null && !startDestination.isEmpty()) {
//            List<Route> routes = routeRepository.findByBusinessAndStartDestinationContaining(
//                    businessService.extractBId(httpServletRequest),startDestination
//            );
//            return routes.stream().map((element) -> modelMapper.map(element, RouteResponse.class))
//                    .collect(Collectors.toList());
//        }else{
//            List<Route> routes = routeRepository.findByBusiness(businessService.extractBId(httpServletRequest));
//            return routes.stream().map((element) -> modelMapper.map(element, RouteResponse.class))
//                    .collect(Collectors.toList());
//        }
    }

    public ResponseEntity<RoutePaginationResponse> findAll(int pageNumber,
                                    int pageSize ){
        Pageable pageable = PageRequest.of(pageNumber, pageSize);
        Page<Route> routePage = routeRepository.findAll(pageable);
        List<Route> routes = routePage.getContent();
        List<RouteResponse> routeResponses = routes.stream()
                .map((element) -> modelMapper.map(element, RouteResponse.class))
                .collect(Collectors.toList());

        RoutePaginationResponse routePaginationResponse = RoutePaginationResponse.builder()
                .content(routeResponses)
                .pageSize(routePage.getSize())
                .pageNo(routePage.getNumber())
                .totalElements(routePage.getTotalElements())
                .totalPages(routePage.getTotalPages())
                .last(routePage.isLast())
                .build();

        return ResponseEntity.status(HttpStatus.OK).body(routePaginationResponse);

    }

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
