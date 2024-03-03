package com.example.BusBuddy.dto.Document;

import com.example.BusBuddy.models.DocCategory;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DocumentRequest {
    private String docName;
    private LocalDate uploadDate;
    private DocCategory category;
    private byte[] data;
    private long id;
}
