package com.example.BusBuddy.controllers;

import com.example.BusBuddy.dto.Document.DocumentRequest;
import com.example.BusBuddy.models.DocCategory;
import com.example.BusBuddy.services.DocumentService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@AllArgsConstructor
@RequestMapping("api/v1/document/")
public class DocumentController {

    private final DocumentService documentService;

    @PostMapping("/add")
    public ResponseEntity<String> add(@RequestParam("file") MultipartFile file,
                                      HttpServletRequest httpServletRequest,
                                      @RequestParam DocCategory category,
                                      @RequestParam(required = false) String name,
                                      @RequestParam(required = false) Long id
                                      ) throws IOException {
        return documentService.add(file,httpServletRequest,category,name,id);
    }

    @PostMapping("/edit")
    public ResponseEntity<String> edit(@RequestParam("file") MultipartFile file,
                                       @RequestParam Long docId,
                                       @RequestParam DocCategory category,
                                       @RequestParam(required = false) String name,
                                       @RequestParam(required = false) Long id) throws IOException {
        return documentService.edit(file, docId, category, name, id);
    }

    @DeleteMapping("/remove")
    public ResponseEntity<String> remove(@RequestParam Long docId){
        return documentService.delete(docId);
    }
}
