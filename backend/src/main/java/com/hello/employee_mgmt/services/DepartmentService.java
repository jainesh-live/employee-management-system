package com.hello.employee_mgmt.services;

import com.hello.employee_mgmt.dto.DepartmentDto;
import com.hello.employee_mgmt.entity.Department;
import com.hello.employee_mgmt.mappers.DepartmentMapper;
import com.hello.employee_mgmt.repo.DepartmentRepo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class DepartmentService {

  private final DepartmentRepo departmentRepo;
  private final DepartmentMapper departmentMapper;

  public List<DepartmentDto> getAll() {
    return departmentRepo.findAll().stream().map(department -> departmentMapper.toDto(department)).toList();
  }

  public DepartmentDto addDepartment(DepartmentDto departmentDto) {
    Department savedDepartment = departmentRepo.save(departmentMapper.toEntity(departmentDto));
    return departmentMapper.toDto(savedDepartment);
  }

  public DepartmentDto getById(Long id) {
     Optional<Department> depOpt = departmentRepo.findById(id);
    return depOpt.map(departmentMapper::toDto).orElse(null);

  }
}
