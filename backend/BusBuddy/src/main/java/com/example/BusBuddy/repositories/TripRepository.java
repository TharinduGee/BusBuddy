package com.example.BusBuddy.repositories;

import com.example.BusBuddy.dto.Trip.EmployeeInfo;
import com.example.BusBuddy.models.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface TripRepository extends JpaRepository<Trip,Long> {
    List<Trip> findByDateAndStartTimeBefore(LocalDate date , Time time );
    Trip findByTicketApiAndDateAndStartTimeBeforeAndEndTimeAfter(
            String ticketApi , LocalDate date , LocalTime start_time , LocalTime end_time
    );

    List<Trip> findByBusinessAndDateBetweenAndStartTimeAfterOrEndTimeBefore(
            Business business , LocalDate startDate, LocalDate endDate, LocalTime startTime, LocalTime endTime
    );

    @Query("SELECT DISTINCT t.driver FROM trip t WHERE t.business = ?1 " +
            "AND t.date BETWEEN ?2 AND ?3 AND t.status <> ?6  AND (t.startTime <= ?4 AND t.endTime >= ?4) OR (t.startTime <= ?5 AND t.endTime >= ?5) " +
            "OR (t.startTime >= ?4 AND t.endTime <= ?5) OR (t.startTime <= ?4 AND t.endTime >= ?5)")
    List<Employee> findDistinctInvalidDrivers(Business business, LocalDate startDate, LocalDate endDate,
                                                LocalTime startTime, LocalTime endTime , TripStatus status);

    @Query("SELECT DISTINCT t.conductor FROM trip t WHERE t.business = ?1 " +
            "AND t.date BETWEEN ?2 AND ?3 AND t.status <> ?6  AND (t.startTime <= ?4 AND t.endTime >= ?4) OR (t.startTime <= ?5 AND t.endTime >= ?5) " +
            "OR (t.startTime >= ?4 AND t.endTime <= ?5) OR (t.startTime <= ?4 AND t.endTime >= ?5)")
    List<Employee> findDistinctInvalidConductors(Business business, LocalDate startDate, LocalDate endDate,
                                                LocalTime startTime, LocalTime endTime , TripStatus status);

    List<Trip> findByBusiness(Business business);
    Page<Trip> findByBusinessAndDateBetween(Business business, LocalDate startDate, LocalDate endDate ,Pageable pageable);
    List<Trip> findByDateAndDriver(LocalDate date , Employee driver);

}
