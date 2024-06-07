package com.example.BusBuddy.dto.Ledger;

import com.example.BusBuddy.dto.Route.RouteResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
public class LedgerPaginationResponse {
    private List<LedgerResponse> content;
    private int pageNo;
    private int pageSize;
    private long totalElements;
    private int totalPages;
    private boolean last;
}
