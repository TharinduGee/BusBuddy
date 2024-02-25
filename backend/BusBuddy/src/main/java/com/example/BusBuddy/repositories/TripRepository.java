package com.example.BusBuddy.repositories;

import com.example.BusBuddy.models.Trip;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TripRepository extends JpaRepository<Trip,Long> {
}
