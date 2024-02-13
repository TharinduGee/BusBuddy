package com.example.BusBuddy.services;

import com.example.BusBuddy.dto.User.UserResponse;
import com.example.BusBuddy.models.User;
import com.example.BusBuddy.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {

  private final UserRepository userRepository;
  private final ModelMapper modelMapper;

  public UserDetailsService userDetailsService() {
      return new UserDetailsService() {
          @Override
          public UserDetails loadUserByUsername(String username) {
              return userRepository.findByEmail(username)
                      .orElseThrow(() -> new UsernameNotFoundException("User not found"));
          }
      };
  }

    public List<UserResponse> getUsersWithNullBusinessAndEmail(String email) {
        if (email != null && !email.isEmpty()) {
            List<User> users= userRepository.findByBusinessIsNullAndEmailContaining(email);
            return users.stream().map((element) -> modelMapper.map(element, UserResponse.class))
                    .collect(Collectors.toList());
        } else {
            List<User> users= userRepository.findByBusinessIsNull();
            return users.stream().map((element) -> modelMapper.map(element, UserResponse.class))
                    .collect(Collectors.toList());
        }
    }

  public User save(User newUser) {
    if (newUser.getId() == null) {
      newUser.setCreatedAt(LocalDateTime.now());
    }

    newUser.setUpdatedAt(LocalDateTime.now());
    return userRepository.save(newUser);
  }

}
