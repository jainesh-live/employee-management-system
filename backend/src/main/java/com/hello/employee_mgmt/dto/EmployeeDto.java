package com.hello.employee_mgmt.dto;

import com.hello.employee_mgmt.entity.Status;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EmployeeDto {

  private Integer id;
  private String name;
  private String emailId;
  private DepartmentDto department;
  private Status status;
}
