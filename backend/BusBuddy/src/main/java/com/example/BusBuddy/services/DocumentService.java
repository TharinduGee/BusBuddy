package com.example.BusBuddy.services;

import com.example.BusBuddy.Exception.EntityNotFoundExceptions.EntityNotFoundException;
import com.example.BusBuddy.models.*;
import com.example.BusBuddy.repositories.DocumentRepository;
import com.example.BusBuddy.repositories.EmployeeRepository;
import com.example.BusBuddy.repositories.RouteRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class DocumentService {

    private final DocumentRepository documentRepository;
    private final EmployeeRepository employeeRepository;
    private final RouteRepository routeRepository;
    private final BusinessService businessService;

    @Transactional
    public ResponseEntity<String> add(MultipartFile file ,
                                      HttpServletRequest httpServletRequest,
                                      DocCategory category,
                                      String docName,
                                      Long id
                                      ) throws IOException {
        if(docName == null){
            docName = file.getOriginalFilename();
        }
        Document doc = Document.builder()
                .docName(docName)
                .data(file.getBytes())
                .business(businessService.extractBId(httpServletRequest))
                .uploadDate(LocalDate.now())
                .build();
        if(category == DocCategory.DOC_CATEGORY_NIC ||
                category == DocCategory.DOC_CATEGORY_SERVICE_AGREEMENT){
            Employee employee = employeeRepository.findById(id)
                    .orElseThrow(() -> new EntityNotFoundException("Employee is not found."));
            doc.setCategory(category);
            doc.setEmployee(employee);
        }else if (category == DocCategory.DOC_CATEGORY_ROUTE_PERMIT){
            Route route = routeRepository.findById(id)
                    .orElseThrow(() -> new EntityNotFoundException("Route is not found."));
            doc.setCategory(category);
            doc.setRoute(route);
        }else if(category == DocCategory.DOC_CATEGORY_UNSPECIFIED) {
            doc.setCategory(DocCategory.DOC_CATEGORY_UNSPECIFIED);
        }
        else{
            throw new InternalError();
        }

        documentRepository.save(doc);

        return  ResponseEntity.ok("Document successfully added.");
    }


    @Transactional
    public ResponseEntity<byte[]> getDocument(Long docId) {
        Document document = documentRepository.findById(docId).orElseThrow(() -> new EntityNotFoundException(
                "Document is not found."
        ));


        if (document.getData() == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        byte[] data = document.getData();


        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentLength(data.length);

        return new ResponseEntity<>(data,  HttpStatus.OK);
    }

    public ResponseEntity<String> edit(MultipartFile file ,
                                       Long docId,
                                       DocCategory category,
                                       String docName,
                                       Long id) throws IOException {
        Document doc = documentRepository.findById(docId).orElseThrow(() -> new EntityNotFoundException("Document is not found."));
        if(docName == null){
            docName = file.getOriginalFilename();
        }
        doc.setDocName(docName);
        if(category == DocCategory.DOC_CATEGORY_NIC ||
                category == DocCategory.DOC_CATEGORY_SERVICE_AGREEMENT){
            Employee employee = employeeRepository.findById(id)
                    .orElseThrow(() -> new EntityNotFoundException("Employee is not found."));
            doc.setCategory(category);
            doc.setEmployee(employee);
        }else if (category == DocCategory.DOC_CATEGORY_ROUTE_PERMIT){
            Route route = routeRepository.findById(id)
                    .orElseThrow(() -> new EntityNotFoundException("Route is not found."));
            doc.setCategory(category);
            doc.setRoute(route);
        }else if(category == DocCategory.DOC_CATEGORY_UNSPECIFIED) {
            doc.setCategory(DocCategory.DOC_CATEGORY_UNSPECIFIED);
        }
        else{
            throw new InternalError();
        }

        documentRepository.save(doc);

        return  ResponseEntity.ok("Document successfully edited.");

    }

    public ResponseEntity<String> delete(long docId){
        if (documentRepository.existsById(docId)){
            documentRepository.deleteById(docId);
        }else{
            throw new EntityNotFoundException("Document not found.");
        }
        return ResponseEntity.ok("Document successfully deleted.");
    }

}
