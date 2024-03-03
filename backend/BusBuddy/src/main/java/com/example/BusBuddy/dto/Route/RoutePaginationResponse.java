package com.example.BusBuddy.dto.Route;

import com.example.BusBuddy.dto.Bus.BusResponse;
import com.example.BusBuddy.models.Route;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
public class RoutePaginationResponse {
    private List<RouteResponse> content;
    private int pageNo;
    private int pageSize;
    private long totalElements;
    private int totalPages;
    private boolean last;
}
