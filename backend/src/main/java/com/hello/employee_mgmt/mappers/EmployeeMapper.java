package com.hello.employee_mgmt.mappers;

import com.hello.employee_mgmt.dto.EmployeeDto;
import com.hello.employee_mgmt.dto.EmployeeRequest;
import com.hello.employee_mgmt.entity.Employee;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring", uses = DepartmentMapper.class)
public interface EmployeeMapper {

  EmployeeDto toDto(Employee employee);

  Employee toEntity(EmployeeDto employeeDto);

  List<EmployeeDto> toDtoList(List<Employee> employees);

  @Mapping(target = "id", ignore = true)
  @Mapping(target = "department", ignore = true)
  Employee toEntity(EmployeeRequest employeeRequest);
}
