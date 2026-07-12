package com.hello.employee_mgmt.dto;

import com.hello.employee_mgmt.entity.Status;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EmployeeRequest {

  private String name;
  private String emailId;
  private Status status;
  private Integer departmentId;
}
