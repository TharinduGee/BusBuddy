package com.example.BusBuddy.services;

import com.example.BusBuddy.dto.Authentication.BusinessEditInfoReq;
import com.example.BusBuddy.models.Business;
import com.example.BusBuddy.repositories.BusinessRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class BusinessService {

    private final BusinessRepository businessRepository;

    public Business save(Business newBusiness) {
        return businessRepository.save(newBusiness);
    }

    public ResponseEntity<String> editInfo(BusinessEditInfoReq request){
        Business info = businessRepository.findById(request.getBId())
                .orElseThrow(() -> new RuntimeException("Business not found with id: " + request.getBId()));
        info.setBName(request.getBName());
        info.setRegistrationNo(request.getRegistrationNo());
        info.setEmail(request.getEmail());
        info.setAddress(request.getAddress());
        var business = this.save(info);

        return ResponseEntity.status(HttpStatus.OK).body("Edited successfully");

    }

    public Business extractBId(HttpServletRequest httpServletRequest){
        String str = (String) httpServletRequest.getAttribute("b_id");
        long bId = Long.parseLong(str);
        Business business = businessRepository.findBybId(bId).orElseThrow(() -> new RuntimeException("Business not found."));
        return business;
    }
}
