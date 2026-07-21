package com.hello.employee_mgmt.dto;

public record LoginRequest(
        String username,
        String password
) {}