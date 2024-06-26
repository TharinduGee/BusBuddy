package com.example.BusBuddy.api.repository;

import com.example.BusBuddy.dto.User.UserResponse;
import com.example.BusBuddy.models.Role;
import com.example.BusBuddy.models.User;
import com.example.BusBuddy.repositories.UserRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.List;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class UserRepositoryTests {

    @Autowired
    private UserRepository userRepository;

    @Test
    public void UserRepository_SaveAll_ReturnsSavedUser(){
        User user = User.builder()
                .email("mydrivertestemail@gmail.com")
                .role(Role.ROLE_DRIVER)
                .firstName("firstname")
                .lastName("lastname")
                .mobileNo("000000000")
                .password("myTestPassword")
                .build();

        User savedUser = userRepository.save(user);

        Assertions.assertThat(savedUser).isNotNull();
        Assertions.assertThat(savedUser.getBusiness()).isNull();
        Assertions.assertThat(savedUser.getId()).isNotNull();
        Assertions.assertThat(savedUser.getPassword()).isNotNull();

    }

    @Test
    public void userRepository_SaveAll_UsernameCheck(){

        User user = User.builder()
                .email("mydrivertestemail@gmail.com")
                .role(Role.ROLE_DRIVER)
                .firstName("firstname")
                .lastName("lastname")
                .mobileNo("000000010")
                .password("myTestPassword")
                .build();

        User savedUser = userRepository.save(user);

        Assertions.assertThat(savedUser.getUsername()).isEqualTo(user.getEmail());

    }

    @DisplayName("User Repository - enroll check")
    @Test
    public void userRepository_enrollCheck(){

        User user = User.builder()
                .email("mydrivertestemail@gmail.com")
                .role(Role.ROLE_DRIVER)
                .firstName("firstname")
                .lastName("lastname")
                .mobileNo("000000010")
                .password("myTestPassword")
                .build();

        userRepository.save(user);
        Pageable pageable = PageRequest.of(1, 10);

        Page<User> unenrolledUsersPage = userRepository.findByBusinessIsNullAndRole(pageable, Role.ROLE_DRIVER,Role.ROLE_CONDUCTOR);

        for(User unenrolledUser : unenrolledUsersPage.getContent()){
            Assertions.assertThat(unenrolledUser.getBusiness()).isNull();
        }

    }

}
