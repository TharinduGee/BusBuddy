package com.example.BusBuddy.controllers;

import com.example.BusBuddy.dto.Route.RouteEditRequest;
import com.example.BusBuddy.dto.Route.RoutePaginationResponse;
import com.example.BusBuddy.dto.Route.RouteRequest;
import com.example.BusBuddy.dto.Route.RouteResponse;
import com.example.BusBuddy.services.RouteService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("api/v1/route")
@CrossOrigin(origins = "http://localhost:3000")
public class RouteController {

    private  final RouteService routeService;

    @GetMapping("/findRoutes")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<RoutePaginationResponse> findRoutes(HttpServletRequest httpServletRequest,
                                                              @RequestParam(value = "pageNo", defaultValue = "0" , required = false)int pageNumber,
                                                              @RequestParam(value = "pageSize", defaultValue = "5" , required = false)int pageSize,
                                                              @RequestParam(required = false) String startDestination
                                                              ){
        return routeService.findRoutes(httpServletRequest, pageNumber, pageSize, startDestination);

    }

    @PostMapping("/add")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<RouteResponse> add(HttpServletRequest httpServletRequest, @RequestBody @Valid  RouteRequest request){
        return routeService.add(httpServletRequest, request);
    }

    @PostMapping("/edit")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> edit(@RequestBody RouteEditRequest request){
        return routeService.edit(request);
    }

    @DeleteMapping("/remove")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> remove(@RequestParam Long routeId){
        return routeService.remove(routeId);
    }
}
