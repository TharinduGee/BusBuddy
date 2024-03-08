package com.example.BusBuddy.controllers;


import com.example.BusBuddy.dto.Authentication.BusinessEditInfoReq;
import com.example.BusBuddy.services.BusinessService;
import lombok.AllArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1")
@CrossOrigin(origins = "http://localhost:3000")
public class BusinessInfoController {

    private final BusinessService businessService;


    @PostMapping("/signUp/edit")
    public ResponseEntity<String> editBusinessInfo(@RequestBody BusinessEditInfoReq request){
        try{
            return businessService.editInfo(request);
        }catch(DataIntegrityViolationException e){
            //only triggered when server error
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

}
