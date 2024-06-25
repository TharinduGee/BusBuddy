package com.example.BusBuddy.repositories;

import com.example.BusBuddy.models.Business;
import com.example.BusBuddy.models.Employee;
import com.example.BusBuddy.models.Role;
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


  @Query("SELECT u FROM users u WHERE u.business IS NULL AND (u.role =:role1 OR u.role =:role2)")
  Page<User> findByBusinessIsNullAndRole(Pageable pageable,@Param("role1") Role role1 ,@Param("role2") Role role2);

  @Query("SELECT u FROM users u WHERE u.business IS NULL AND u.email=:email AND (u.role =:role1 OR u.role =:role2)")
  Page<User> findByBusinessIsNullAndEmailContainingIgnoreCaseAndRole(Pageable pageable,@Param("email") String email ,
                                                              @Param("role1") Role role1 ,@Param("role2") Role role2);


  
}
