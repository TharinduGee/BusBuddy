package com.example.BusBuddy.repositories;

import com.example.BusBuddy.models.Business;
import com.example.BusBuddy.models.Employee;
import com.example.BusBuddy.models.Trip;
import org.springframework.data.jpa.repository.JpaRepository;

import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public interface TripRepository extends JpaRepository<Trip,Long> {
    List<Trip> findByDateAndStartTimeBefore(LocalDate date , Time time );
    Trip findByTicketApiAndDateAndStartTimeBeforeAndEndTimeAfter(
            String ticketApi , LocalDate date , LocalTime start_time , LocalTime end_time
    );

    List<Trip> findByBusiness(Business business);

    List<Trip> findByDateAndDriver(LocalDate date , Employee driver);
    List<Trip> findByDateAndConductor(LocalDate date , Employee conductor);
    List<Trip> findByDate(LocalDate date);
}
