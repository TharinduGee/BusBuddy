package com.example.BusBuddy.controllers;

import com.example.BusBuddy.dto.Route.RouteEditRequest;
import com.example.BusBuddy.dto.Route.RoutePaginationResponse;
import com.example.BusBuddy.dto.Route.RouteRequest;
import com.example.BusBuddy.dto.Route.RouteResponse;
import com.example.BusBuddy.services.RouteService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("api/v1/route")
public class RouteController {

    private  final RouteService routeService;

    @PostMapping("findRoutes")
    public ResponseEntity<RoutePaginationResponse> findRoutes(HttpServletRequest httpServletRequest,
                                                              @RequestParam(value = "pageNo", defaultValue = "1" , required = false)int pageNumber,
                                                              @RequestParam(value = "pageSize", defaultValue = "5" , required = false)int pageSize,
                                                              @RequestParam(required = false) String startDestination
                                                              ){
        return routeService.findRoutes(httpServletRequest, pageNumber, pageSize, startDestination);

    }

    @PostMapping("findAll")
    public ResponseEntity<RoutePaginationResponse> findAll(
                                                              @RequestParam(value = "pageNo", defaultValue = "1" , required = false)int pageNumber,
                                                              @RequestParam(value = "pageSize", defaultValue = "5" , required = false)int pageSize

    ){
        return routeService.findAll( pageNumber, pageSize);

    }

    @PostMapping("/add")
    public ResponseEntity<RouteResponse> add(HttpServletRequest httpServletRequest, @RequestBody RouteRequest request){
        return routeService.add(httpServletRequest, request);
    }

    @PostMapping("/edit")
    public ResponseEntity<String> edit(@RequestBody RouteEditRequest request){
        return routeService.edit(request);
    }

    @DeleteMapping("/remove")
    public ResponseEntity<String> remove(@RequestParam Long routeId){
        return routeService.remove(routeId);
    }
}
