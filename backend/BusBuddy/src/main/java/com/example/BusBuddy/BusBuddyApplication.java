package com.example.BusBuddy;


import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.bind.annotation.*;


@RestController
@SpringBootApplication
@EnableScheduling
@CrossOrigin(origins = "http://localhost:3000")
public class BusBuddyApplication implements CommandLineRunner {

	@Bean
	public ModelMapper modelMapper(){
		return new ModelMapper();
	}

	@Autowired
	public static void main(String[] args) {
		SpringApplication.run(BusBuddyApplication.class, args);
	}

	public void run(String...args){

	}





}


