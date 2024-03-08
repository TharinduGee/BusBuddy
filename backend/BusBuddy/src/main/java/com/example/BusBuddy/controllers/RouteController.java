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

    @PostMapping("/edit")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> edit(@RequestParam @NotBlank(message = "This field can't be empty") Long routeId ,
                                      @RequestParam @NotBlank(message = "This field can't be empty") String startDestination,
                                      @RequestParam @NotBlank(message = "This field can't be empty")  String endDestination,
                                      @RequestParam double distance,
                                      @RequestParam Integer noOfSections,
                                      @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) @NotNull(message = "Date should be selected")
                                      Date permitExpDate,
                                      @RequestParam("file") MultipartFile file
    ) throws IOException {
        return routeService.edit(routeId, startDestination, endDestination, distance, noOfSections, permitExpDate, file);
    }


    @DeleteMapping("/remove")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> remove(@RequestParam Long routeId){
        return routeService.remove(routeId);
    }
}
