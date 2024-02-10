package com.example.BusBuddy.repositories;

import com.example.BusBuddy.models.Bus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BusRepository extends JpaRepository <Bus, Long>{

    //Optional<Bus> findByBusId(String bus_id);

}
