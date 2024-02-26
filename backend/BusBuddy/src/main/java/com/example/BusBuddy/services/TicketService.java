package com.example.BusBuddy.services;

import com.example.BusBuddy.dto.Ticket.TicketRequest;
import com.example.BusBuddy.models.Trip;
import com.example.BusBuddy.repositories.TripRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;

@Service
@AllArgsConstructor
public class TicketService {

    private final TripRepository tripRepository;

    public void addTicket(TicketRequest ticketRequest){
        Trip trip = tripRepository.findByTicketApiAndDateAndStartTimeBeforeAndEndTimeAfter(
                ticketRequest.getTicketApi(),
                LocalDate.now() ,
                LocalTime.now() ,
                LocalTime.now()
        );
        if(trip != null){ // if trip is available for certain ticket
            if(trip.getStatus() == TripStatus.TRIP_STATUS_SCHEDULED){
                trip.setStatus(TripStatus.TRIP_STATUS_ONGOING);
                tripRepository.save(trip);
            }
            Double currentIncome = trip.getIncome();
            trip.setIncome(currentIncome + ticketRequest.getFee());
            tripRepository.save(trip);
            System.out.println("The ticket is added");
        }else{
            System.out.println("No trip found for certain ticket");
        }
    }
}
