package com.example.BusBuddy.Exception.EntityNotFoundExceptions;

public class EntityNotFoundException extends RuntimeException{
    public EntityNotFoundException(String message){
        super(message);
    }

}
