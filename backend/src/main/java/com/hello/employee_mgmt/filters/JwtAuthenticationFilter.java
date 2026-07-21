package com.hello.employee_mgmt.filters;

import com.hello.employee_mgmt.services.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

  private final JwtService jwtService;
  private final UserDetailsService userDetailsService;

  @Override
  protected void doFilterInternal(
          HttpServletRequest request,
          HttpServletResponse response,
          FilterChain chain)
          throws ServletException, IOException {

    String auth = request.getHeader("Authorization");

    if (auth == null || !auth.startsWith("Bearer ")) {
      chain.doFilter(request, response);
      return;
    }

    String token = auth.substring(7);

    String username =
            jwtService.extractUsername(token);

    if (username != null &&
            SecurityContextHolder.getContext()
                    .getAuthentication() == null) {

      UserDetails user =
              userDetailsService.loadUserByUsername(username);

      if (jwtService.validate(token, user)) {

        UsernamePasswordAuthenticationToken authentication =
                new UsernamePasswordAuthenticationToken(
                        user,
                        null,
                        user.getAuthorities());

        SecurityContextHolder.getContext()
                .setAuthentication(authentication);
      }
    }

    chain.doFilter(request, response);
  }
}