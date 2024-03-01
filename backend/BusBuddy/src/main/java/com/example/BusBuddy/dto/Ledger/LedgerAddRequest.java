package com.example.BusBuddy.dto.Ledger;


import com.example.BusBuddy.models.TransactionType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LedgerAddRequest {
    private TransactionType type;
    private Double debit;
    private Double credit;
}
