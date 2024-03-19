package com.example.BusBuddy.controllers;

import com.example.BusBuddy.dto.Route.RouteEditRequest;
import com.example.BusBuddy.dto.Route.RoutePaginationResponse;
import com.example.BusBuddy.dto.Route.RouteRequest;
import com.example.BusBuddy.dto.Route.RouteResponse;
import com.example.BusBuddy.services.RouteService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("api/v1/route")
@CrossOrigin(origins = "*")
public class RouteController {

    private  final RouteService routeService;

    @GetMapping("/findRoutes")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<RoutePaginationResponse> findRoutes(HttpServletRequest httpServletRequest,
                                                              @RequestParam(value = "pageNo", defaultValue = "0" , required = false) int pageNumber,
                                                              @RequestParam(value = "pageSize", defaultValue = "5" , required = false) int pageSize,
                                                              @RequestParam(required = false) String startDestination
                                                              ){
        return routeService.findRoutes(httpServletRequest, pageNumber, pageSize, startDestination);

    }

    @PostMapping("/add")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> add(HttpServletRequest httpServletRequest,
                                       @RequestParam  String startDestination,
                                       @RequestParam  String endDestination,
                                       @RequestParam(required = false) double distance,
                                       @RequestParam(required = false) Integer noOfSections,
                                       @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
                                       Date permitExpDate,
                                       @RequestParam(value = "file", required = false) MultipartFile file
    ) throws IOException {
        return routeService.add(httpServletRequest, startDestination, endDestination, distance, noOfSections, permitExpDate, file);
    }

    @PostMapping("/edit")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> edit(
            HttpServletRequest httpServletRequest,
            @RequestParam Long routeId ,
                                      @RequestParam String startDestination,
                                      @RequestParam  String endDestination,
                                      @RequestParam(required = false) double distance,
                                      @RequestParam(required = false) Integer noOfSections,
                                      @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
                                      Date permitExpDate,
                                      @RequestParam(value = "file",required = false) MultipartFile file
    ) throws IOException {
        return routeService.edit(httpServletRequest, routeId, startDestination, endDestination, distance, noOfSections, permitExpDate, file);
    }

    @GetMapping("/geRouteIds")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Long>> getRouteIds(HttpServletRequest httpServletRequest){
        return routeService.getRouteIds(httpServletRequest);
    }

    @DeleteMapping("/remove")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> remove(@RequestParam Long routeId){
        return routeService.remove(routeId);
    }
}
