package com.example.BusBuddy.services;

import com.example.BusBuddy.Exception.EntityNotFoundException;
import com.example.BusBuddy.dto.Document.DocumentPaginationResponse;
import com.example.BusBuddy.dto.Document.DocumentResponse;
import com.example.BusBuddy.models.*;
import com.example.BusBuddy.repositories.BusRepository;
import com.example.BusBuddy.repositories.DocumentRepository;
import com.example.BusBuddy.repositories.EmployeeRepository;
import com.example.BusBuddy.repositories.RouteRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DocumentService {

    private final DocumentRepository documentRepository;
    private final EmployeeRepository employeeRepository;
    private final RouteRepository routeRepository;
    private final BusRepository busRepository;
    private final BusinessService businessService;
    @Transactional
    public DocumentPaginationResponse findDocumentByType(HttpServletRequest httpServletRequest,
                                                         DocCategory docCategory ,
                                                         String docName,
                                                         int pageNo,
                                                         int pageSize

    ){
        Pageable pageable = PageRequest.of(pageNo,pageSize);
        Page<Document> documentPage = documentRepository.findByBusinessAndCategoryAndDocNameContainingIgnoreCase(
                businessService.extractBId(httpServletRequest),
                docCategory, Optional.ofNullable(docName),
                pageable
                );

        List<Document> documentList = documentPage.getContent();
        List<DocumentResponse> routeResponses = documentList.stream().map(
                document -> DocumentResponse.builder()
                        .docId(document.getDocId())
                        .docName(document.getDocName())
                        .data(document.getData())
                        .uploadDate(document.getUploadDate())
                        .RefId(document.getRoute() != null ? document.getRoute().getRouteId() : document.getEmployee() != null ?
                                document.getEmployee().getEmpId() : document.getBus() != null ? document.getBus().getBusId() : null)
                        .build()
        ).toList();

        return DocumentPaginationResponse.builder()
                .content(routeResponses)
                .totalPages(documentPage.getTotalPages())
                .totalElements(documentPage.getTotalElements())
                .last(documentPage.isLast())
                .pageNo(documentPage.getNumber())
                .pageSize(documentPage.getSize())
                .build();
    }

    @Transactional
    public String add(MultipartFile file ,
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
        if(category == DocCategory.DOC_CATEGORY_SERVICE_AGREEMENT){
            Employee employee = employeeRepository.findById(id)
                    .orElseThrow(() -> new EntityNotFoundException("Employee is not found."));
            doc.setCategory(category);
            doc.setEmployee(employee);
        }else if (category == DocCategory.DOC_CATEGORY_ROUTE_PERMIT){
            Route route = routeRepository.findById(id)
                    .orElseThrow(() -> new EntityNotFoundException("Route is not found."));
            doc.setCategory(category);
            doc.setRoute(route);
        }else if(category == DocCategory.DOC_CATEGORY_BUS_DOC) {
            Bus bus = busRepository.findById(id)
                    .orElseThrow(() -> new EntityNotFoundException("Bus is not found."));
            doc.setCategory(DocCategory.DOC_CATEGORY_BUS_DOC);
            doc.setBus(bus);
        }else if(category == DocCategory.DOC_CATEGORY_UNSPECIFIED) {
            doc.setCategory(DocCategory.DOC_CATEGORY_UNSPECIFIED);
        }
        else{
            throw new InternalError("Document category isn't handled.");
        }

        documentRepository.save(doc);

        return "Document successfully added.";
    }


    @Transactional
    public byte[] getDocument(Long docId) {
        Document document = documentRepository.findById(docId).orElseThrow(() -> new EntityNotFoundException(
                "Document is not found."
        ));
        return document.getData();
    }

    public String edit(MultipartFile file ,
                                       Long docId,
                                       DocCategory category,
                                       String docName,
                                       Long id) throws IOException {
        Document doc = documentRepository.findById(docId).orElseThrow(() -> new EntityNotFoundException("Document is not found."));
        if(docName == null){
            docName = file.getOriginalFilename();
        }
        doc.setDocName(docName);
        doc.setUploadDate(LocalDate.now());
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
        }
        else if(category == DocCategory.DOC_CATEGORY_BUS_DOC) {
                Bus bus = busRepository.findById(id)
                        .orElseThrow(() -> new EntityNotFoundException("Bus is not found."));
                doc.setCategory(DocCategory.DOC_CATEGORY_BUS_DOC);
                doc.setBus(bus);
        }else if(category == DocCategory.DOC_CATEGORY_UNSPECIFIED) {
            doc.setCategory(DocCategory.DOC_CATEGORY_UNSPECIFIED);
        }
        else{
            throw new InternalError();
        }

        documentRepository.save(doc);

        return "Document successfully edited.";

    }

    public String delete(long docId){
        if (documentRepository.existsById(docId)){
            documentRepository.deleteById(docId);
        }else{
            throw new EntityNotFoundException("Document not found.");
        }
        return "Document successfully deleted.";
    }

}