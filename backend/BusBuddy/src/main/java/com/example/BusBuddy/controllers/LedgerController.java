package com.example.BusBuddy.controllers;

import com.example.BusBuddy.dto.Employee.EmployeePaginationResponse;
import com.example.BusBuddy.dto.Ledger.DailyFinanceResponse;
import com.example.BusBuddy.dto.Ledger.LedgerAddRequest;
import com.example.BusBuddy.dto.Ledger.LedgerPaginationResponse;
import com.example.BusBuddy.models.Ledger;
import com.example.BusBuddy.services.LedgerService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.persistence.Tuple;


@RestController
@RequestMapping("api/v1/ledger")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class LedgerController {

    private final LedgerService ledgerService;

    @GetMapping("/findAll")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<LedgerPaginationResponse>  findAll(@RequestParam(value = "pageNo", defaultValue = "0" , required = false) int pageNumber,
                                                             @RequestParam(value = "pageSize", defaultValue = "20" , required = false)int pageSize){
        return ResponseEntity.ok(ledgerService.findAll(pageNumber, pageSize));
    }

    @PostMapping("/addEntry")
    @PreAuthorize("hasAnyRole('DRIVER', 'CONDUCTOR', 'ADMIN')")
    public ResponseEntity<String> addEntry(HttpServletRequest httpServletRequest,
                                           @RequestBody @Valid LedgerAddRequest ledgerAddRequest
                                           ){
        return ResponseEntity.ok(ledgerService.addEntry(httpServletRequest, ledgerAddRequest));
    }


    @GetMapping("/dailyFinance")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<DailyFinanceResponse> dailyIncome(HttpServletRequest httpServletRequest){
        return ResponseEntity.ok(ledgerService.dailyIncome(httpServletRequest));
    }


}
