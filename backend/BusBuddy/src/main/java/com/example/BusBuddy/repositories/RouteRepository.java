package com.example.BusBuddy.repositories;

import com.example.BusBuddy.models.Business;
import com.example.BusBuddy.models.Route;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RouteRepository extends JpaRepository <Route, Long> {

    Page<Route> findByBusinessAndStartDestinationContainingIgnoreCase(Business business , String startDestination, Pageable pageable );

    Page<Route> findByBusinessOrderByRouteId(Business business , Pageable pageable );

    @Query("SELECT r.routeId FROM route r WHERE r.business = ?1")
    List<Long> findByBusiness(Business business);

}
