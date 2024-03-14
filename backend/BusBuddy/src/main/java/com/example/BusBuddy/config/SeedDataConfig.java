//package com.example.BusBuddy.config;
//
//import com.example.BusBuddy.models.Business;
//import com.example.BusBuddy.models.Role;
//import com.example.BusBuddy.models.User;
//import com.example.BusBuddy.repositories.UserRepository;
//import com.example.BusBuddy.services.BusinessService;
//import com.example.BusBuddy.services.UserService;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Component;
//
//@Component
//@RequiredArgsConstructor
//@Slf4j
//public class SeedDataConfig implements CommandLineRunner {
//
//    private final UserRepository userRepository;
//    private final PasswordEncoder passwordEncoder;
//    private final UserService userService;
//    private final BusinessService businessService;
//
//    @Override
//    public void run(String... args) throws Exception {
//
//      if (userRepository.count() == 0) {
//          Business business = Business.builder().build();
//          business = businessService.save(business);
//        User admin = User
//                      .builder()
//                      .firstName("admin")
//                      .lastName("admin")
//                      .email("admin@admin.com")
//                      .password(passwordEncoder.encode("password"))
//                      .role(Role.ROLE_ADMIN)
//                .business(business)
//                      .build();
//
//        userService.save(admin);
//        log.debug("created ADMIN user - {}", admin);
//      }
//    }
//
//}
