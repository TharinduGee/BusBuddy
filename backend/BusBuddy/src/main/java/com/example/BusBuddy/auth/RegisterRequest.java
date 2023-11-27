package com.example.BusBuddy.auth;


import lombok.*;
import org.springframework.beans.factory.annotation.Autowired;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class RegisterRequest {

    private String firstname;
    private String lastname;
    private String email;
    private String password;

    public String getFirstname(){
        return this.firstname;
    }
    public String getLastname(){
        return this.lastname;
    }
    public String getEmail(){
        return this.email;
    }
    public String getPassword(){
        return this.password;
    }


}
