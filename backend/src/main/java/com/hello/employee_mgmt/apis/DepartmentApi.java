package com.hello.employee_mgmt.apis;

import com.hello.employee_mgmt.dto.DepartmentDto;
import com.hello.employee_mgmt.services.DepartmentService;
import jakarta.websocket.server.PathParam;
import lombok.AllArgsConstructor;
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
@RequestMapping("/department")
@AllArgsConstructor
public class DepartmentApi {

  private final DepartmentService departmentService;

  @GetMapping
  public ResponseEntity<List<DepartmentDto>> getAll() {
    return ResponseEntity.ok(departmentService.getAll());
  }

  @GetMapping("/{id}")
  public ResponseEntity<DepartmentDto> get(@PathVariable("id") Long id) {
    DepartmentDto dep = departmentService.getById(id);
    if(dep == null) {
      return ResponseEntity.notFound().build();
    }

    return ResponseEntity.ok(dep);
  }

  @PostMapping
  public ResponseEntity<DepartmentDto> addDepartment(@RequestBody DepartmentDto departmentDto) {
    DepartmentDto savedDep = departmentService.addDepartment(departmentDto);
    return ResponseEntity.created(URI.create("/department/" + savedDep.getId())).body(savedDep);
  }
}
