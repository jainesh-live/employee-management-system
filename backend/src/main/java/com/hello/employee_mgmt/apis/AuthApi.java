package com.hello.employee_mgmt.apis;

import com.hello.employee_mgmt.dto.LoginRequest;
import com.hello.employee_mgmt.dto.LoginResponse;
import com.hello.employee_mgmt.services.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthApi {

  private final AuthenticationManager manager;
  private final JwtService jwtService;
  private final UserDetailsService uds;

  @PostMapping("/login")
  public LoginResponse login(@RequestBody LoginRequest request) {

    manager.authenticate(
            new UsernamePasswordAuthenticationToken(
                    request.username(),
                    request.password()
            )
    );

    UserDetails user =
            uds.loadUserByUsername(request.username());

    return new LoginResponse(
            jwtService.generateToken(user)
    );
  }
}
