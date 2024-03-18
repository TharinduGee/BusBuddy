package com.example.BusBuddy.controllers;

import com.example.BusBuddy.dto.Ledger.DailyFinanceResponse;
import com.example.BusBuddy.dto.Ledger.LedgerAddRequest;
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

    @PostMapping("/addEntry")
    public ResponseEntity<String> addEntry(HttpServletRequest httpServletRequest,
                                           @RequestBody @Valid LedgerAddRequest ledgerAddRequest
                                           ){
        return ledgerService.addEntry(httpServletRequest, ledgerAddRequest);
    }

//    @DeleteMapping("/remove")
//    @PreAuthorize("hasRole('ADMIN')")
//    public ResponseEntity<String> removeEntry(@RequestParam Long ledgerId){
//        return ledgerService.removeEntry(ledgerId);
//    }

    @GetMapping("/dailyFinance")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<DailyFinanceResponse> dailyIncome(HttpServletRequest httpServletRequest){
        return ledgerService.dailyIncome(httpServletRequest);
    }


}
