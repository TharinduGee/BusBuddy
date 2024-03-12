package com.example.BusBuddy.controllers;



import com.example.BusBuddy.dto.Bus.BusPaginationResponse;
import com.example.BusBuddy.models.Bus;
import com.example.BusBuddy.models.BusType;
import com.example.BusBuddy.services.BusService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import springfox.documentation.annotations.ApiIgnore;

import java.io.IOException;
import java.util.Date;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/bus")
@CrossOrigin(origins = "http://localhost:3000")
@ApiIgnore
public class BusController {
    private final BusService busService;

    @PostMapping("/add")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> add(HttpServletRequest httpServletRequest,
                                      @RequestParam BusType type,
                                      @RequestParam String numberPlate,
                                      @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date lastServicedDate,
                                      @RequestParam(required = false)  Integer seats,
                                      @RequestParam(required = false)  String regNo,
                                      @RequestParam(value = "file", required = false) MultipartFile file) throws IOException {
        return busService.add(httpServletRequest, type, numberPlate, lastServicedDate, seats, regNo, file);
    }

    @GetMapping("/findById")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Bus> findById(@RequestParam Long busId)  {
        return busService.findByBusId(busId);
    }

    @GetMapping("/getBusIds")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Long>> getBusIds(HttpServletRequest httpServletRequest){
        return busService.getBusIds(httpServletRequest);
    }

    @PostMapping("/edit")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> editBus(HttpServletRequest httpServletRequest,
                                      @RequestParam Long busId,
                                      @RequestParam BusType type,
                                      @RequestParam String numberPlate,
                                      @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date lastServicedDate,
                                      @RequestParam(required = false)  int seats,
                                      @RequestParam(required = false)  String regNo,
                                      @RequestParam(value = "file", required = false) MultipartFile file) throws IOException {
        busService.editBus(httpServletRequest,busId, type, numberPlate, lastServicedDate, seats, regNo, file);
        return ResponseEntity.ok("Bus edited successsfully.");
    }

    @DeleteMapping("/remove")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> remove(@RequestParam Long busId) {
        return busService.remove(busId);
    }

    @GetMapping("/findAll")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<BusPaginationResponse> findAll(@RequestParam(value = "pageNo", defaultValue = "0" , required = false) int pageNumber,
                                                         @RequestParam(value = "pageSize", defaultValue = "5" , required = false)int pageSize) {
        return busService.findAll(pageNumber , pageSize);
    }

    @GetMapping("/findBuses")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<BusPaginationResponse> findRoutes(HttpServletRequest httpServletRequest,
                                                              @RequestParam(value = "pageNo", defaultValue = "0" , required = false)int pageNumber,
                                                              @RequestParam(value = "pageSize", defaultValue = "5" , required = false)int pageSize,
                                                              @RequestParam(required = false) String numberPlate
    ){
        return busService.findBuses(httpServletRequest, pageNumber, pageSize, numberPlate);
    }

    @GetMapping("/count")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Long> countBus(HttpServletRequest httpServletRequest) {
        return busService.countBus(httpServletRequest);
    }
}
