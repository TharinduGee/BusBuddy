package com.example.BusBuddy.dto.Document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DocumentResponse {
    private Long docId;
    private String docName;
    private LocalDate uploadDate;
    private byte[] data;
    private Long RefId;
}
