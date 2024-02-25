package com.example.BusBuddy.controllers;

import com.example.BusBuddy.dto.Route.RouteEditRequest;
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
