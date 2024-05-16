package com.example.BusBuddy.services;

import com.example.BusBuddy.Exception.EntityNotFoundException;
import com.example.BusBuddy.dto.Ledger.DailyFinanceResponse;
import com.example.BusBuddy.dto.Ledger.LedgerAddRequest;
import com.example.BusBuddy.models.*;
import com.example.BusBuddy.repositories.BusRepository;
import com.example.BusBuddy.repositories.EmployeeRepository;
import com.example.BusBuddy.repositories.LedgerRepository;
import com.example.BusBuddy.repositories.TripRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

@Service
@AllArgsConstructor
public class LedgerService {

    private final BusinessService businessService;
    private final LedgerRepository ledgerRepository;
    private final TripRepository tripRepository;
    private final EmployeeRepository employeeRepository;
    private final BusRepository busRepository;

    @Transactional
    public String addEntry(HttpServletRequest httpServletRequest , @NotNull LedgerAddRequest ledgerAddRequest){
        Ledger ledger = new Ledger();
        if (ledgerAddRequest.getType() == TransactionType.TRANSACTION_TYPE_TICKET_INCOME) {
            ledger.setAmount(ledgerAddRequest.getAmount());
            ledger.setType(TransactionType.TRANSACTION_TYPE_TICKET_INCOME);
            Trip trip = tripRepository.findById(ledgerAddRequest.getRefId()).orElseThrow(() -> new EntityNotFoundException(
                    "Trip not found."
            ));
            ledger.setTrip(trip);

        }
        else if (ledgerAddRequest.getType() == TransactionType.TRANSACTION_TYPE_TICKET_EXPENSE) {
            ledger.setAmount(-ledgerAddRequest.getAmount());
            ledger.setType(TransactionType.TRANSACTION_TYPE_TICKET_EXPENSE);
            Trip trip = tripRepository.findById(ledgerAddRequest.getRefId()).orElseThrow(() -> new EntityNotFoundException(
                    "Trip not found."
            ));
            ledger.setTrip(trip);

        } else if (ledgerAddRequest.getType() == TransactionType.TRANSACTION_TYPE_EMPLOYEE_SALARY) {
            ledger.setAmount(-ledgerAddRequest.getAmount());
            ledger.setType(TransactionType.TRANSACTION_TYPE_EMPLOYEE_SALARY);
            Employee employee = employeeRepository.findById(ledgerAddRequest.getRefId()).orElseThrow(() -> new EntityNotFoundException(
                    "Employee not found."
            ));
            ledger.setEmployee(employee);
        } else if (ledgerAddRequest.getType() == TransactionType.TRANSACTION_TYPE_SERVICE) {
            ledger.setAmount(-ledgerAddRequest.getAmount());
            ledger.setType(TransactionType.TRANSACTION_TYPE_SERVICE);
            Bus bus = busRepository.findById(ledgerAddRequest.getRefId()).orElseThrow(() -> new EntityNotFoundException(
                    "Bus not found."
            ));
            ledger.setBus(bus);
        } else if (ledgerAddRequest.getType() == TransactionType.TRANSACTION_TYPE_UNSPECIFIED) {
            ledger.setAmount(-ledgerAddRequest.getAmount());
            ledger.setType(TransactionType.TRANSACTION_TYPE_UNSPECIFIED);
        } else{
            throw new InternalError();
        }
        ledger.setTransactionName(ledgerAddRequest.getName());
        ledger.setTimestamp(LocalDateTime.now());
        ledger.setBusiness(businessService.extractBId(httpServletRequest));
        if(ledgerAddRequest.getName() != null){
            ledger.setTransactionName(ledgerAddRequest.getName());
        }else{
            ledger.setTransactionName(ledger.getType().toString() + (ledgerAddRequest.getRefId() == null ? "" : ledgerAddRequest.getRefId()));
        }

        ledger = ledgerRepository.save(ledger);

        return "Ledger entry added successfully!";
    }


    public void addTripLedgerEntry(@NotNull Trip trip){
        Ledger entry = Ledger.builder()
                .timestamp(LocalDateTime.now())
                .amount(trip.getIncome())
                .transactionName(trip.getTripId()+" - Ticket Income")
                .type(TransactionType.TRANSACTION_TYPE_TICKET_INCOME)
                .business(trip.getBusiness())
                .build();
        ledgerRepository.save(entry);
        System.out.println("Ledger added");
    }


    public DailyFinanceResponse dailyIncome(HttpServletRequest httpServletRequest){
        Business business = businessService.extractBId(httpServletRequest);
        LocalDateTime localDateTime = LocalDateTime.now();
        LocalDateTime startOfDay = localDateTime.withHour(0).withMinute(0).withSecond(0).withNano(0);
        LocalDateTime endOfDay = localDateTime.withHour(23).withMinute(59).withSecond(59).withNano(0);
        Map<String, Double> incomeAndExpense =  ledgerRepository.dailyIncomeAndExpense(business, startOfDay , endOfDay );
        DailyFinanceResponse dailyFinanceResponse = DailyFinanceResponse.builder()
                .income(incomeAndExpense.get("dailyIncome") == null ? 0 : incomeAndExpense.get("dailyIncome"))
                .expense(incomeAndExpense.get("dailyExpense") == null ? 0 : incomeAndExpense.get("dailyExpense"))
                .build();
        return dailyFinanceResponse;
    }

}
