package com.example.BusBuddy.dto.Ledger;

import com.example.BusBuddy.models.TransactionType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.sql.Time;
import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
public class LedgerResponse {
    private Long transactionId;
    private String transactionName;
    private double amount;
    private TransactionType transactionType;
    private Long refId;
    private LocalDateTime time;
    private Long docId;
}
