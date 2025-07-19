package com.plaart_back_app.plaart.service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {

    @Value("${jwt.secret}")
    private String secretKey;

    @Value("${jwt.expiration}")
    private Long jwtExpiration;

    @Value("${jwt.refresh-token.expiration}")
    private Long refreshExpiration;

    private SecretKey getSignInKey() {
        byte[] keyBytes = secretKey.getBytes();
        return Keys.hmacShaKeyFor(keyBytes);
    }

    // Extrae claims usando el nuevo parser
    private Claims extractAllClaims(String token) {
        JwtParser parser = Jwts.parser()
                .setSigningKey(getSignInKey())
                .build();

        Jws<Claims> claimsJws = parser.parseClaimsJws(token);
        return claimsJws.getBody();
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
    }

    // Construye token con el nuevo builder
    private String buildToken(Map<String, Object> extraClaims, UserDetails userDetails, Long expiration) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + expiration);

        return Jwts.builder()
                .setClaims(extraClaims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(getSignInKey()) // sin pasar SignatureAlgorithm, queda implícito
                .compact();
    }

    public String generateRefreshToken(UserDetails userDetails) {
        return buildToken(new HashMap<>(), userDetails, refreshExpiration);
    }

    public String generateToken(Map<String, Object> extraClaims, UserDetails userDetails) {
        return buildToken(extraClaims, userDetails, jwtExpiration);
    }

    public String generateToken(UserDetails userDetails) {
        return generateToken(new HashMap<>(), userDetails);
    }
}
/**
 * JwtService.java
 * 
 * This service handles JWT token generation and validation.
 * It uses the JJWT library to create and parse JWT tokens.
 * 
 * Example usage:
 *
/**
 * @Service
 *          public class JwtService {
 * 
 *          // JWT configuration properties
 *          @Value("${jwt.secret}")
 *          private String secretKey;
 * 
 *          @Value("${jwt.expiration}")
 *          private Long jwtExpiration;
 * 
 *          @Value("${jwt.refresh-token.expiration}")
 *          private Long refreshExpiration;
 * 
 *          // Method to generate JWT token
 *          public String extractUsername(String token) {
 *          return extractClaim(token, Claims::getSubject);
 *          }
 * 
 *          public <T> T extractClaim(String token, Function<Claims, T>
 *          claimsResolver) {
 *          final Claims claims = extractAllClaims(token);
 *          return claimsResolver.apply(claims);
 *          }
 * 
 *          private Claims extractAllClaims(String token) {
 *          return Jwts
 *          .parser()
 *          .setSigningKey(getSignInKey())
 *          .build()
 *          .parseClaimsJws(token)
 *          .getBody();
 *          }
 * 
 *          private SecretKey getSignInKey() {
 *          byte[] keyBytes = secretKey.getBytes();
 *          return Keys.hmacShaKeyFor(keyBytes);
 *          }
 * 
 *          private Date extractExpiration(String token) {
 *          return extractClaim(token, Claims::getExpiration);
 *          }
 * 
 *          private boolean isTokenValid(String token, UserDetails userDetails)
 *          {
 *          final String username = extractUsername(token);
 *          return (username.equals(userDetails.getUsername())) &&
 *          !isTokenExpired(token);
 *          }
 * 
 *          private boolean isTokenExpired(String token) {
 *          return extractExpiration(token).before(new Date());
 *          }
 * 
 *          private String buildToken(Map<String, Object> extraClaims,
 *          UserDetails userDetails, Long expiration) {
 *          return Jwts.builder()
 *          .setClaims(extraClaims)
 *          .setSubject(userDetails.getUsername())
 *          .setIssuedAt(new Date(System.currentTimeMillis()))
 *          .setExpiration(new Date(System.currentTimeMillis() + expiration))
 *          .signWith(getSignInKey(), SignatureAlgorithm.HS256)
 *          .compact();
 * 
 *          }
 * 
 *          private String generateRefreshToken(UserDetails userDetails) {
 *          return buildToken(new HashMap<>(), userDetails, refreshExpiration);
 *          }
 * 
 *          private String generateToken(Map<String, Object> extraClaims,
 *          UserDetails userDetails) {
 *          return buildToken(extraClaims, userDetails, jwtExpiration);
 *          }
 * 
 *          private String generateToken(UserDetails userDetails) {
 *          return generateToken(new HashMap<>(), userDetails);
 *          }
 *          }
 */
