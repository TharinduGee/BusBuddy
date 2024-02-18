package com.example.BusBuddy.repositories;

import com.example.BusBuddy.models.Business;
import com.example.BusBuddy.models.Route;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RouteRepository extends JpaRepository <Route, Long> {

    Page<Route> findByBusinessAndStartDestinationContaining(Business business , String startDestination, Pageable pageable );

    Page<Route> findByBusiness(Business business , Pageable pageable );


    //List<Route> findByBusinessAndStartDestinationContaining(Business business, String startDestination);
}
