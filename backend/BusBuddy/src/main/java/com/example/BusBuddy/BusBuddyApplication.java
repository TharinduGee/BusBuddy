package com.example.BusBuddy;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;


@RestController
@SpringBootApplication
public class BusBuddyApplication {

	public static void main(String[] args) {
		SpringApplication.run(BusBuddyApplication.class, args);
	}

	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping("/")
	public String hello(@RequestParam(value="name", defaultValue = "World!") String name){
		return String.format("Hello %s", name);
	}



}


