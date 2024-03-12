package com.example.BusBuddy.dto.Authentication;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BusinessEditInfoReq {
    @NotNull(message = "Name : null")
    private String businessName;
    @NotNull(message = "Registration no : null")
    private String registrationNo;
    @NotNull(message = "Email : null")
    private String email;
    @NotNull(message = "Address : null")
    private String address;
}
