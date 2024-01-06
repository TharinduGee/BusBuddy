package com.example.BusBuddy.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BusinessEditInfoReq {
    Long bId;
    String bName;
    String registrationNo;
    String email;
    String address;
}
