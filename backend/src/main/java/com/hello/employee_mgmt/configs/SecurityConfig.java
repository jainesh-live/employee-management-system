package com.hello.employee_mgmt.configs;

import com.hello.employee_mgmt.filters.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

  private final JwtAuthenticationFilter jwtFilter;

  @Bean
  SecurityFilterChain security(HttpSecurity http) {

    http
            .csrf(AbstractHttpConfigurer::disable)

            .sessionManagement(session ->
                    session.sessionCreationPolicy(
                            SessionCreationPolicy.STATELESS))

            .authorizeHttpRequests(auth -> auth
                    .requestMatchers("/api/auth/**")
                    .permitAll()
                    .requestMatchers(HttpMethod.GET, "/**")
                    .permitAll()
                    // Only ADMIN can modify
                    .requestMatchers(HttpMethod.POST, "/**")
                    .hasRole("ADMIN")
                    .requestMatchers(HttpMethod.PUT, "/**")
                    .hasRole("ADMIN")
                    .requestMatchers(HttpMethod.PATCH, "/**")
                    .hasRole("ADMIN")
                    .requestMatchers(HttpMethod.DELETE, "/**")
                    .hasRole("ADMIN")
                    .anyRequest()
                    .authenticated())

            .addFilterBefore(jwtFilter,
                    UsernamePasswordAuthenticationFilter.class);

    return http.build();
  }

  @Bean
  AuthenticationManager authenticationManager(
          AuthenticationConfiguration configuration) {

    return configuration.getAuthenticationManager();
  }
}