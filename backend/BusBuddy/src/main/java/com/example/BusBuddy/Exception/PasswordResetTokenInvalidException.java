package com.example.BusBuddy.Exception;


public class PasswordResetTokenInvalidException extends RuntimeException {
    public PasswordResetTokenInvalidException(String message){
        super(message);
    }
}
