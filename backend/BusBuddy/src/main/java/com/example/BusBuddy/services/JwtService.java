package com.example.BusBuddy.services;

import com.example.BusBuddy.models.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {

  @Value("${token.secret.key}")
  String jwtSecretKey;

  @Value("${token.expirationms}")
  Long jwtExpirationMs;

  @Value("${refreshtoken.expirationms}")
  Long refreshJWTExpirationMs;

  public String extractUserName(String token) {
      return extractClaim(token, Claims::getSubject);
  }

  public String extractBId(String token) {
      return extractClaim(token, Claims::getAudience);
  }

  public String extractEmpId(String jwt) {
      Claims claims = extractAllClaims(jwt);
      return extractClaim(jwt, claims1 -> claims.get("emp_id", String.class));
  }

  public String generateToken(User userDetails) {
      return generateToken(new HashMap<>(), userDetails);
  }

  public String generateRefreshToken(UserDetails userDetails){
      return generateRefreshToken(new HashMap<>(), userDetails);
  }

  public boolean isTokenValid(String token, UserDetails userDetails) {
      final String userName = extractUserName(token);
      return (userName.equals(userDetails.getUsername())) && !isTokenExpired(token);
  }

  private <T> T extractClaim(String token, Function<Claims, T> claimsResolvers) {
      final Claims claims = extractAllClaims(token);
      return claimsResolvers.apply(claims);
  }

  private String generateToken(Map<String, Object> extraClaims, User userDetails) {

      if(userDetails.getEmployee() == null){ // set empId null if normal user not enrolled
          extraClaims.put("emp_id", null);
      }else{ // otherwise retrieve the id and set it in the token
          extraClaims.put("emp_id", userDetails.getEmployee().getEmpId().toString());
      }


      return Jwts
        .builder()
        .setClaims(extraClaims)
              .setAudience(userDetails.getBusiness().getBId().toString())
        .setSubject(userDetails.getUsername())
        .setIssuedAt(new Date(System.currentTimeMillis()))
        .setExpiration(new Date(System.currentTimeMillis() + jwtExpirationMs))
        .signWith(getSigningKey(), SignatureAlgorithm.HS256)
        .compact();
  }


    private String generateRefreshToken(Map<String, Object> extractClaims , UserDetails userDetails){
        return Jwts.builder()
                .setClaims(extractClaims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 *60*24*1000))
                .signWith(getSigningKey(),  SignatureAlgorithm.HS256)
                .compact();
    }

  private boolean isTokenExpired(String token) {
      return extractExpiration(token).before(new Date());
  }

  private Date extractExpiration(String token) {
      return extractClaim(token, Claims::getExpiration);
  }

  private Claims extractAllClaims(String token) {
      return Jwts
        .parserBuilder()
        .setSigningKey(getSigningKey())
        .build()
        .parseClaimsJws(token)
        .getBody();
  }


  private Key getSigningKey() {
      byte[] keyBytes = Decoders.BASE64.decode(jwtSecretKey);
      return Keys.hmacShaKeyFor(keyBytes);
  }

}