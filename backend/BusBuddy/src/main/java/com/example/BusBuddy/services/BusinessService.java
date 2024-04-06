package com.example.BusBuddy.services;

import com.example.BusBuddy.dto.Authentication.BusinessEditInfoReq;
import com.example.BusBuddy.dto.Business.BusinessInfo;
import com.example.BusBuddy.models.Business;
import com.example.BusBuddy.repositories.BusinessRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.NotNull;
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

    public String editInfo(HttpServletRequest httpServletRequest , @NotNull BusinessEditInfoReq request){
        Business business = extractBId(httpServletRequest);
        business.setBName(request.getBusinessName());
        business.setRegistrationNo(request.getRegistrationNo());
        business.setEmail(request.getEmail());
        business.setAddress(request.getAddress());

        businessRepository.save(business);

        return "Edited successfully";

    }

    public BusinessInfo getInfo(HttpServletRequest httpServletRequest){
        Business business = extractBId(httpServletRequest);
        return BusinessInfo.builder()
                .businessName(business.getBName())
                .email(business.getEmail())
                .registrationNo(business.getRegistrationNo())
                .address(business.getAddress())
                .build();
    }

    public Business extractBId(@NotNull HttpServletRequest httpServletRequest){
        String str = (String) httpServletRequest.getAttribute("b_id");
        long bId = Long.parseLong(str);
        Business business = businessRepository.findBybId(bId).orElseThrow(() -> new RuntimeException("Business not found."));
        return business;
    }
}
