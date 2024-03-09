package com.example.BusBuddy.dto.Ledger;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DailyFinanceResponse {
    private float income ;
    private float expense ;
}
