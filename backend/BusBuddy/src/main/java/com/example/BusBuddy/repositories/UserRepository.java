package com.example.BusBuddy.repositories;

import com.example.BusBuddy.models.Business;
import com.example.BusBuddy.models.Employee;
import com.example.BusBuddy.models.User;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.util.Streamable;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

  @Transactional
  Optional<User> findByEmail(String email);

  Page<User> findByBusinessIsNull(Pageable pageable);

  Page<User> findByBusinessIsNullAndEmailContainingIgnoreCase(String email , Pageable pageable);
  
}
