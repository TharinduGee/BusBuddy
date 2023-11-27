package com.example.BusBuddy.auth;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationRequest {

    private String email;

    String password;

    public String getEmail(){
        return this.email;
    }
    public String getPassword(){
        return this.password;
    }

}
