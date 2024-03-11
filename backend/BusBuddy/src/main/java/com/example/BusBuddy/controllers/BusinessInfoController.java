package com.example.BusBuddy.controllers;


import com.example.BusBuddy.dto.Authentication.BusinessEditInfoReq;
import com.example.BusBuddy.dto.Business.BusinessInfo;
import com.example.BusBuddy.services.BusinessService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/business")
@CrossOrigin(origins = "http://localhost:3000")
public class BusinessInfoController {

    private final BusinessService businessService;


    @PostMapping("/editBusinessInfo")
    public ResponseEntity<String> editBusinessInfo(HttpServletRequest httpServletRequest ,
                                                   @RequestBody BusinessEditInfoReq businessEditInfoReq){
            return businessService.editInfo(httpServletRequest, businessEditInfoReq);
    }

    @GetMapping("/getInfo")
    public ResponseEntity<BusinessInfo> getInfo(HttpServletRequest httpServletRequest){
        return  ResponseEntity.ok(businessService.getInfo(httpServletRequest));
    }

}
