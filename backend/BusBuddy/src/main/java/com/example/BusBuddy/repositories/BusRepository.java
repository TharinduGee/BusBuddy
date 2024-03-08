package com.example.BusBuddy.repositories;

import com.example.BusBuddy.models.Bus;
import com.example.BusBuddy.models.Business;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


public interface BusRepository extends JpaRepository <Bus, Long>{
    long countByBusiness(Business business);

    Page<Bus>  findByBusinessAndNumberPlateContainingIgnoreCase(Business business, String numberPlate, Pageable pageable);

    Page<Bus>  findByBusiness(Business business,  Pageable pageable);
}
