package com.example.BusBuddy.Exception;

public class UserNotAssignedException  extends RuntimeException{
    public UserNotAssignedException(){
        super("User is not assigned.");
    }
}
