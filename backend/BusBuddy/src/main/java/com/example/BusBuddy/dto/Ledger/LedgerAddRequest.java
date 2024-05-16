package com.example.BusBuddy.dto.Ledger;


import com.example.BusBuddy.models.TransactionType;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LedgerAddRequest {
    @NotNull
    private TransactionType type;

    private String name;

    @NotNull
    private Double amount;

    private Long refId;
}
