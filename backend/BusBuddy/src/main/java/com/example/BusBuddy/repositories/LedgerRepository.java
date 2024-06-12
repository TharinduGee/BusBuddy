package com.example.BusBuddy.repositories;

import com.example.BusBuddy.dto.Ledger.DailyFinanceResponse;
import com.example.BusBuddy.models.Business;
import com.example.BusBuddy.models.Ledger;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.persistence.Tuple;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Map;
import java.util.Optional;

@Repository
public interface LedgerRepository extends JpaRepository<Ledger, Long> {
//    @Query("SELECT SUM(CASE WHEN amount > 0 THEN amount ELSE 0 END) FROM ledger WHERE business = ?1 AND timestamp BETWEEN ?2 AND  ?3" )
//    Optional<Double> dailyIncome(Business business , LocalDateTime startOfDay , LocalDateTime endOfDay);
//
//    @Query("SELECT SUM(CASE WHEN amount < 0 THEN amount ELSE 0 END) AS expense FROM ledger WHERE business = ?1 AND timestamp BETWEEN ?2 AND  ?3" )
//    Optional<Double> dailyExpense(Business business , LocalDateTime startOfDay , LocalDateTime endOfDay);

    @Query("SELECT SUM(CASE WHEN amount > 0 THEN amount ELSE 0 END) AS dailyIncome, " +
            "SUM(CASE WHEN amount < 0 THEN amount ELSE 0 END) AS dailyExpense " +
            "FROM ledger WHERE business = ?1 AND timestamp BETWEEN ?2 AND ?3")
    Map<String, Double> dailyIncomeAndExpense(Business business, LocalDateTime startOfDay, LocalDateTime endOfDay);

    Page<Ledger> findByTimestampBetween(LocalDateTime startOfDay ,LocalDateTime endOfDay , Pageable pageable);
}
