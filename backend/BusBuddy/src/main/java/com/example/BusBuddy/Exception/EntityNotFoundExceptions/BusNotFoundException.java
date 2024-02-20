package com.example.BusBuddy.Exception.EntityNotFoundExceptions;

public class BusNotFoundException extends EntityNotFoundException {
    public BusNotFoundException(){
        super("Bus not found.");
    }
}
