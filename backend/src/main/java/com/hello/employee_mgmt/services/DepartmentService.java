package com.hello.employee_mgmt.services;

import com.hello.employee_mgmt.dto.DepartmentDto;
import com.hello.employee_mgmt.mappers.DepartmentMapper;
import com.hello.employee_mgmt.repo.DepartmentRepo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class DepartmentService {

  private final DepartmentRepo departmentRepo;
  private final DepartmentMapper departmentMapper;

  public List<DepartmentDto> getAll() {
    return departmentRepo.findAll().stream().map(department -> departmentMapper.toDto(department)).toList();
  }
}
