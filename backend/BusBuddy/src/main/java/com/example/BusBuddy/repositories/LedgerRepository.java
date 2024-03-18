package com.example.BusBuddy.repositories;

import com.example.BusBuddy.dto.Ledger.DailyFinanceResponse;
import com.example.BusBuddy.models.Business;
import com.example.BusBuddy.models.Ledger;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.persistence.Tuple;
import java.time.LocalDateTime;

@Repository
public interface LedgerRepository extends JpaRepository<Ledger, Long> {
//    @Query("SELECT SUM(credit) FROM ledger WHERE business = ?1 AND timestamp BETWEEN ?2 AND  ?3" )
//    Float dailyIncome(Business business , LocalDateTime startOfDay , LocalDateTime endOfDay);
//    @Query("SELECT SUM(debit) AS expense FROM ledger WHERE business = ?1 AND timestamp BETWEEN ?2 AND  ?3" )
//    Float dailyExpense(Business business , LocalDateTime startOfDay , LocalDateTime endOfDay);
}
