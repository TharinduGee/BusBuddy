package com.example.BusBuddy.repositories;

import com.example.BusBuddy.models.Bus;
import com.example.BusBuddy.models.User;

import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;

import java.awt.print.Pageable;

public interface BusRepository extends JpaRepository <Bus, Long>{


}
