package com.example.BusBuddy;

import com.example.BusBuddy.user.Role;
import com.example.BusBuddy.user.User;
import com.example.BusBuddy.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;


@RestController
@SpringBootApplication
public class BusBuddyApplication implements CommandLineRunner {

	@Autowired
	private UserRepository userRepository;

	public static void main(String[] args) {
		System.setProperty("spring.devtools.restart.enabled", "false");
		SpringApplication.run(BusBuddyApplication.class, args);
	}

	public void run(String...args){
		User adminAccount =  userRepository.findByRole(Role.ADMIN);
		if(adminAccount == null){
			User user = new User();
			user.setUsername("adminusername");
			user.setEmail("admin@gmail.com");
			user.setFirstname("admin");
			user.setLastname("admin");
			user.setRole(Role.ADMIN);
			user.setPassword(new BCryptPasswordEncoder().encode("admin"));

			userRepository.save(user);
		}
	}

	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping("/")
	public String hello(@RequestParam(value="name", defaultValue = "World!") String name){
		return String.format("Hello %s", name);
	}



}


