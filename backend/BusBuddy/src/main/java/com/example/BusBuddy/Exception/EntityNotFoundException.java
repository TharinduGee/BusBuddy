package com.example.BusBuddy.Exception;

public class EntityNotFoundException extends RuntimeException{
    public EntityNotFoundException(String message){
        super(message);
    }

}
