package com.hello.employee_mgmt.mappers;

import com.hello.employee_mgmt.dto.DepartmentDto;
import com.hello.employee_mgmt.entity.Department;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface DepartmentMapper {

  DepartmentDto toDto(Department department);

  Department toEntity(DepartmentDto departmentDto);
}
