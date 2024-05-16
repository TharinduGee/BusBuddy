package com.example.BusBuddy.services;

import com.example.BusBuddy.Exception.EntityNotFoundException;
import com.example.BusBuddy.dto.Route.RoutePaginationResponse;
import com.example.BusBuddy.dto.Route.RouteResponse;
import com.example.BusBuddy.models.*;
import com.example.BusBuddy.repositories.DocumentRepository;
import com.example.BusBuddy.repositories.RouteRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RouteService {
    private final RouteRepository routeRepository;
    private  final BusinessService businessService;
    private final DocumentService documentService;
    private final ModelMapper modelMapper;
    private final DocumentRepository documentRepository;

    @Transactional
    public RoutePaginationResponse findRoutes(
            HttpServletRequest httpServletRequest,
            int pageNumber,
            int pageSize,
            String startDestination){
        Pageable pageable = PageRequest.of(pageNumber, pageSize);
        Page<Route> routePage;
        if(startDestination != null && !startDestination.isEmpty()){
            routePage =
                    routeRepository.findByBusinessAndStartDestinationContainingIgnoreCase(
                            businessService.extractBId(httpServletRequest) ,
                            startDestination,
                            pageable
                    );
        }else{
            routePage =
                    routeRepository.findByBusinessOrderByRouteId(
                            businessService.extractBId(httpServletRequest),
                            pageable
                    );
        }

        List<Route> routes = routePage.getContent();
        List<RouteResponse> routeResponses = routes.stream()
                .map(route ->
                    RouteResponse.builder()
                            .routeId(route.getRouteId())
                            .startDestination(route.getStartDestination())
                            .endDestination(route.getEndDestination())
                            .distance(route.getDistance())
                            .noOfSections(route.getNoOfSections())
                            .permitExpDate(route.getPermitExpDate())
                            .docId(route.getDocument() != null ? route.getDocument().getDocId() : null)
                            .docName(route.getDocument() != null ? route.getDocument().getDocName() : null)
                            .build()
                )
                .collect(Collectors.toList());

        RoutePaginationResponse routePaginationResponse = RoutePaginationResponse.builder()
                .content(routeResponses)
                .pageSize(routePage.getSize())
                .pageNo(routePage.getNumber())
                .totalElements(routePage.getTotalElements())
                .totalPages(routePage.getTotalPages())
                .last(routePage.isLast())
                .build();

        return routePaginationResponse;

    }

    public RoutePaginationResponse findAll(int pageNumber,
                                    int pageSize ){
        Pageable pageable = PageRequest.of(pageNumber, pageSize);
        Page<Route> routePage = routeRepository.findAll(pageable);
        List<Route> routes = routePage.getContent();
        List<RouteResponse> routeResponses = routes.stream()
                .map((element) -> modelMapper.map(element, RouteResponse.class))
                .collect(Collectors.toList());

        RoutePaginationResponse routePaginationResponse = RoutePaginationResponse.builder()
                .content(routeResponses)
                .pageSize(routePage.getSize())
                .pageNo(routePage.getNumber())
                .totalElements(routePage.getTotalElements())
                .totalPages(routePage.getTotalPages())
                .last(routePage.isLast())
                .build();

        return routePaginationResponse;

    }

    @Transactional
    public String add(HttpServletRequest httpServletRequest,
                                             String startDestination,
                                             String endDestination,
                                             double distance,
                                             Integer noOfSections,
                                             Date permitExpDate,
                                             MultipartFile file) throws IOException {

        Route route = Route.builder()
                .startDestination(startDestination)
                .endDestination(endDestination)
                .distance(distance)
                .noOfSections(noOfSections)
                .permitExpDate(permitExpDate)
                .business(businessService.extractBId(httpServletRequest))
                .build();

        route = routeRepository.save(route);

        if(file != null){
            documentService.add(file,httpServletRequest,
                    DocCategory.DOC_CATEGORY_ROUTE_PERMIT,
                    file.getOriginalFilename(),
                    route.getRouteId()
            );
        }

        return "Route added successfully";
    }

    public List<Long> getRouteIds(HttpServletRequest httpServletRequest){
        Business business = businessService.extractBId(httpServletRequest);
        List<Long> routeIds = routeRepository.findByBusiness(business);

        return routeIds;
    }

    @Transactional
    public String edit(
            HttpServletRequest httpServletRequest,
            Long routeId,
            String startDestination,
            String endDestination,
            double distance,
            Integer noOfSections,
            Date permitExpDate,
            MultipartFile file) throws IOException {
        Route editedRoute = routeRepository.findById(routeId)
                .orElseThrow(()-> new EntityNotFoundException("Route Not found."));

        if(file != null && editedRoute.getDocument() != null){
            Document document = editedRoute.getDocument();
            document.setData(file.getBytes());
            document.setDocName(file.getOriginalFilename());
            documentRepository.save(document);
        }else if(file != null){
            documentService.add(file,httpServletRequest,
                    DocCategory.DOC_CATEGORY_ROUTE_PERMIT,
                    file.getOriginalFilename(),
                    editedRoute.getRouteId()
            );
        }

        editedRoute.setStartDestination(startDestination);
        editedRoute.setEndDestination(endDestination);
        editedRoute.setDistance(distance);
        editedRoute.setNoOfSections(noOfSections);
        editedRoute.setPermitExpDate(permitExpDate);
        routeRepository.save(editedRoute);

        return  "Successfully Edited";
    }

    public String remove(long routeId){
        routeRepository.deleteById(routeId);
        return "Successfully Deleted";
    }
}
