package com.example.BusBuddy.repositories;

import com.example.BusBuddy.models.Bus;
import com.example.BusBuddy.models.Business;
import com.example.BusBuddy.models.Employee;
import com.example.BusBuddy.models.Trip;
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


    //Optional<Trip> findByBusiness(Business business, Pageable pageable);


    List<Trip> findByBusiness(Business business);
    Page<Trip> findByBusinessAndDateBetween(Business business, LocalDate startDate, LocalDate endDate ,Pageable pageable);
    List<Trip> findByDateAndDriver(LocalDate date , Employee driver);

}
