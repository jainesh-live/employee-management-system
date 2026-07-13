package com.hello.employee_mgmt.apis;

import com.hello.employee_mgmt.dto.DepartmentDto;
import com.hello.employee_mgmt.services.DepartmentService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/department")
@AllArgsConstructor
public class DepartmentApi {

  private final DepartmentService departmentService;

  @GetMapping
  public ResponseEntity<List<DepartmentDto>> getAll() {
    return ResponseEntity.ok(departmentService.getAll());
  }
}
