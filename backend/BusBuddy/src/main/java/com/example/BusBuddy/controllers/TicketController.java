package com.example.BusBuddy.controllers;

import com.example.BusBuddy.dto.Ticket.TicketRequest;
import com.example.BusBuddy.services.TicketService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("api/v1/ticket")
@CrossOrigin(origins = "*")
public class TicketController {

    private TicketService ticketService;

    @PostMapping("/addTicket")
    public ResponseEntity<String> addTicket(@RequestBody TicketRequest ticketRequest){
        ticketService.addTicket(ticketRequest);
        return ResponseEntity.status(HttpStatus.OK).body("Ticket Posted");
    }
}
