package com.example.BusBuddy.repositories;

import com.example.BusBuddy.models.Business;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BusinessRepository extends JpaRepository<Business , Long> {
    Optional<Business> findBybId(Long b_Id);
    
}
