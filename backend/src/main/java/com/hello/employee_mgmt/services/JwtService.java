package com.hello.employee_mgmt.services;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class JwtService {

  @Value("${jwt.secret}")
  private String secret;

  @Value("${jwt.expiration}")
  private long expiration;

  public String generateToken(UserDetails user) {

    return Jwts.builder()
            .subject(user.getUsername())
            .issuedAt(new Date())
            .expiration(new Date(System.currentTimeMillis() + expiration))
            .signWith(Keys.hmacShaKeyFor(secret.getBytes()), Jwts.SIG.HS256)
            .compact();
  }

  public String extractUsername(String token) {

    return extractClaims(token).getSubject();
  }

  public Date extractExpiration(String token) {

    return extractClaims(token).getExpiration();
  }

  private Claims extractClaims(String token) {

    return Jwts.parser()
            .verifyWith(Keys.hmacShaKeyFor(secret.getBytes()))
            .build()
            .parseSignedClaims(token)
            .getPayload();
  }

  public boolean isTokenExpired(String token) {

    return extractExpiration(token).before(new Date());
  }

  public boolean validate(String token, UserDetails user) {

    return extractUsername(token).equals(user.getUsername())
            && !isTokenExpired(token);
  }
}
