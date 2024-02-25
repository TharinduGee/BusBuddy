package com.example.BusBuddy.repositories;

import com.example.BusBuddy.models.Trip;
import org.springframework.data.jpa.repository.JpaRepository;

import java.sql.Time;
import java.time.LocalDate;
import java.util.List;

public interface TripRepository extends JpaRepository<Trip,Long> {
    List<Trip> findByDateAndStartTimeBefore(LocalDate date , Time time );

    List<Trip> findByDate(LocalDate date);
}
