package com.example.BusBuddy.controllers;

import com.example.BusBuddy.dto.Document.DocumentDataResponse;
import com.example.BusBuddy.dto.Document.DocumentPaginationResponse;
import com.example.BusBuddy.dto.Document.DocumentRequest;
import com.example.BusBuddy.models.DocCategory;
import com.example.BusBuddy.services.DocumentService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@AllArgsConstructor
@RequestMapping("api/v1/document/")
@CrossOrigin(origins = "*")
public class DocumentController {

    private final DocumentService documentService;

    @GetMapping("/getDocument")
    public ResponseEntity<byte[]> getDocument(@RequestParam Long docId) throws IOException {
        DocumentDataResponse documentDataResponse = documentService.getDocument(docId);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentLength(documentDataResponse.getData().length);
        return ResponseEntity.ok(documentDataResponse.getData());
    }

    @GetMapping("/getDocType")
    public ResponseEntity<String> getDocType(@RequestParam Long docId) throws IOException {
        return ResponseEntity.ok(documentService.getDocType(docId));
    }

    @GetMapping("/findDocumentByType")
    public ResponseEntity<DocumentPaginationResponse> findDocumentByType(HttpServletRequest httpServletRequest,
                                                                         @RequestParam DocCategory docCategory,
                                                                         @RequestParam(required = false) String docName,
                                                                         @RequestParam(value = "pageNo", defaultValue = "0" , required = false) int pageNumber,
                                                                         @RequestParam(value = "pageSize", defaultValue = "5" , required = false) int pageSize
    ) throws IOException {
        return ResponseEntity.ok(documentService.findDocumentByType(httpServletRequest,docCategory,docName,pageNumber,pageSize));
    }

    @PostMapping("/add")
    public ResponseEntity<String> add(@RequestParam("file") MultipartFile file,
                                      HttpServletRequest httpServletRequest,
                                      @RequestParam DocCategory category,
                                      @RequestParam(required = false) String name,
                                      @RequestParam(required = false) Long id
                                      ) throws IOException {
        return ResponseEntity.ok(documentService.add(file,httpServletRequest,category,name,id));
    }

    @PostMapping("/edit")
    public ResponseEntity<String> edit(@RequestParam("file") MultipartFile file,
                                       @RequestParam Long docId,
                                       @RequestParam DocCategory category,
                                       @RequestParam(required = false) String name,
                                       @RequestParam(required = false) Long id) throws IOException {
        return ResponseEntity.ok(documentService.edit(file, docId, category, name, id));
    }

    @DeleteMapping("/remove")
    public ResponseEntity<String> remove(@RequestParam Long docId){
        return ResponseEntity.ok(documentService.delete(docId));
    }
}
