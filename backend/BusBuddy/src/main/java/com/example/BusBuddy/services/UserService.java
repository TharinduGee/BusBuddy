package com.example.BusBuddy.services;

import com.example.BusBuddy.Exception.EntityNotFoundException;
import com.example.BusBuddy.dto.User.UserResponse;
import com.example.BusBuddy.models.User;
import com.example.BusBuddy.repositories.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;


import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {

  private final UserRepository userRepository;
  private final ModelMapper modelMapper;


  public UserDetailsService userDetailsService() {
      return username -> userRepository.findByEmail(username)
              .orElseThrow(() -> new EntityNotFoundException("User not found"));
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


  public ResponseEntity<String> uploadImage(HttpServletRequest httpServletRequest, MultipartFile imageFile) throws IOException {
      String username = (String) httpServletRequest.getAttribute("username");
      User user = userRepository.findByEmail(username).orElseThrow(() -> new EntityNotFoundException(
              "User is not found."
      ));

      user.setImage(imageFile.getBytes());
      save(user);

      return ResponseEntity.status(HttpStatus.OK).body("Image is updated successfully.");
  }



    @Transactional
    public ResponseEntity<byte[]> getImage(HttpServletRequest httpServletRequest) {
        String username = (String) httpServletRequest.getAttribute("username");
        User user = userRepository.findByEmail(username).orElseThrow(() -> new EntityNotFoundException(
                "User is not found."
        ));


        if (user.getImage() == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        byte[] imageData = user.getImage();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.valueOf(MediaType.IMAGE_JPEG_VALUE));
        headers.setContentLength(imageData.length);

        return new ResponseEntity<>(imageData, headers, HttpStatus.OK);
    }

    @Transactional
    public ResponseEntity<String> getUsername(HttpServletRequest httpServletRequest) {
        String username = (String) httpServletRequest.getAttribute("username");
        User user = userRepository.findByEmail(username).orElseThrow(() -> new EntityNotFoundException(
                "User is not found."
        ));
        String fullName = user.getFirstName() + " " + user.getLastName();
        return  ResponseEntity.ok(fullName);
    }


  public User save(User newUser) {
    if (newUser.getId() == null) {
      newUser.setCreatedAt(LocalDateTime.now());
    }

    newUser.setUpdatedAt(LocalDateTime.now());
    return userRepository.save(newUser);
  }

}
