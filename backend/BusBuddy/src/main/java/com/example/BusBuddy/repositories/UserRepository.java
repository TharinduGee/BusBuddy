package com.example.BusBuddy.repositories;

import com.example.BusBuddy.models.Employee;
import com.example.BusBuddy.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

  Optional<User> findByEmail(String email);

  @Query(value = "SELECT * FROM users WHERE email LIKE %admin%", nativeQuery = true)
  List<User> findAll(String query);
  
}
