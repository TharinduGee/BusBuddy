package com.example.BusBuddy;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.web.bind.annotation.*;


@RestController
@SpringBootApplication
@CrossOrigin(origins = "http://localhost:3000")
public class BusBuddyApplication implements CommandLineRunner {

	@Autowired


	public static void main(String[] args) {
		System.setProperty("spring.devtools.restart.enabled", "false");
		SpringApplication.run(BusBuddyApplication.class, args);
	}

	public void run(String...args){

	}





}


