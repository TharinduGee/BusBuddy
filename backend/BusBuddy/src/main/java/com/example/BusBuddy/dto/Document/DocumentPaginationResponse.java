package com.example.BusBuddy.dto.Document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DocumentPaginationResponse {
    private List<DocumentResponse> content;
    private int pageSize;
    private int pageNo;
    private long totalElements;
    private int totalPages;
    private boolean last;
}
