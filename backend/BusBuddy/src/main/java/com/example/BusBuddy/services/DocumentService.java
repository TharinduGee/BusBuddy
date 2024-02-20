package com.example.BusBuddy.services;

import com.example.BusBuddy.repositories.DocumentRepository;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
@RequiredArgsConstructor
public class DocumentService {
    private final DocumentRepository documentRepository;
    private final ModelMapper modelMapper;

}
