package com.example.BusBuddy.dto.Bus;

import com.example.BusBuddy.models.Bus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
public class BusPaginationResponse {
    private List<BusResponse> content;
    private int pageNo;
    private int pageSize;
    private long totalElements;
    private int totalPages;
    private boolean last;
}
