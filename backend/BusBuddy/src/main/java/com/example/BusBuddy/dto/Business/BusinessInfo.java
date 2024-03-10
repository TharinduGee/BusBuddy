package com.example.BusBuddy.dto.Business;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BusinessInfo {
    private String businessName;
    private String registrationNo;
    private String email;
    private String address;
}
