package com.hello.employee_mgmt.services;

import com.hello.employee_mgmt.dto.EmployeeDto;
import com.hello.employee_mgmt.dto.EmployeeRequest;
import com.hello.employee_mgmt.entity.Department;
import com.hello.employee_mgmt.entity.Employee;
import com.hello.employee_mgmt.mappers.EmployeeMapper;
import com.hello.employee_mgmt.repo.DepartmentRepo;
import com.hello.employee_mgmt.repo.EmployeeRepo;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {

  private final EmployeeRepo employeeRepo;
  private final DepartmentRepo departmentRepo;
  private final EmployeeMapper employeeMapper;

  public EmployeeService(EmployeeRepo employeeRepo, DepartmentRepo departmentRepo,
                         EmployeeMapper employeeMapper) {
    this.employeeRepo = employeeRepo;
    this.departmentRepo = departmentRepo;
    this.employeeMapper = employeeMapper;
  }

  public List<EmployeeDto> getEmployeesList() {
    List<Employee> employeeList = employeeRepo.findAll();
    return employeeMapper.toDtoList(employeeList);
  }

  public EmployeeDto getById(Long employeeId) {
    Optional<Employee> employee = employeeRepo.findById(employeeId);
    return employee.map(employeeMapper::toDto).orElse(null);
  }

  public EmployeeDto create(EmployeeRequest employeeRequest) {
    Employee employee = employeeMapper.toEntity(employeeRequest);
    if (employeeRequest.getDepartmentId() != null) {
      Department department = departmentRepo.findById(employeeRequest.getDepartmentId())
          .orElseThrow(() -> new IllegalArgumentException(
              "Department not found: " + employeeRequest.getDepartmentId()));
      employee.setDepartment(department);
    }
    Employee saved = employeeRepo.save(employee);
    return employeeMapper.toDto(saved);
  }
}
