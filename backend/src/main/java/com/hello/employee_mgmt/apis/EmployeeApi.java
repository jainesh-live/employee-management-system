package com.hello.employee_mgmt.apis;

import com.hello.employee_mgmt.dto.EmployeeDto;
import com.hello.employee_mgmt.dto.EmployeeRequest;
import com.hello.employee_mgmt.services.EmployeeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;

import java.util.List;

@RestController
@RequestMapping("/employee")
public class EmployeeApi {

  private final EmployeeService employeeService;

  public EmployeeApi(EmployeeService employeeService) {
    this.employeeService = employeeService;
  }

  @GetMapping
  public ResponseEntity<List<EmployeeDto>> getList() {
    List<EmployeeDto> employeeList = employeeService.getEmployeesList();
    return ResponseEntity.ok(employeeList);
  }

  @GetMapping("/{id}")
  public ResponseEntity<EmployeeDto> getEmployee(@PathVariable("id") Long employeeId) {
    EmployeeDto employeeDto = employeeService.getById(employeeId);
    if (employeeDto == null) {
      return ResponseEntity.notFound().build();
    }
    return ResponseEntity.ok(employeeDto);
  }

  @PostMapping
  public ResponseEntity<EmployeeDto> create(@RequestBody EmployeeRequest employeeRequest) {
    EmployeeDto created = employeeService.create(employeeRequest);
    return ResponseEntity.created(URI.create("/employee/" + created.getId())).body(created);
  }

}
