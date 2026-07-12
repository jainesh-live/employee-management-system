# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

`employee-mgmt` is a Spring Boot 4.1 REST service (Java 21, Maven) for managing employees and departments. Despite living under a `HELLO_REACT` parent directory, this is a **backend-only Java project** — there is no frontend here.

The project is at an early, unfinished stage: several methods are stubbed and will not compile as-is (`EmployeeApi.getList`, `EmployeeService.getEmployeesList` have empty/incomplete bodies, `EmployeeMapper` has no mapping methods, `Department` entity is missing `@Id`). Expect to complete these when extending the code.

## Commands

Uses the Maven wrapper (`./mvnw`); no global Maven needed.

- Build: `./mvnw clean package`
- Run app: `./mvnw spring-boot:run`
- Run all tests: `./mvnw test`
- Run a single test class: `./mvnw test -Dtest=ClassName`
- Run a single test method: `./mvnw test -Dtest=ClassName#methodName`

No test sources exist yet (`src/test` is empty).

## Architecture

Standard layered Spring Boot structure under `com.hello.employee_mgmt` (note the underscore — `com.hello.employee-mgmt` is an invalid package name, see `HELP.md`):

- `apis/` — `@RestController` REST endpoints; delegate to services, return `ResponseEntity<...Dto>`.
- `services/` — business logic; call repos and use mappers to convert entities ↔ DTOs.
- `repo/` — Spring Data JPA `JpaRepository` interfaces.
- `entity/` — JPA `@Entity` classes (persistence layer).
- `dto/` — API-facing data transfer objects.
- `mappers/` — MapStruct `@Mapper(componentModel = "spring")` interfaces to map entities to/from DTOs.

**Key convention:** entities never cross the API boundary. Controllers and services exchange DTOs; entity↔DTO conversion goes through MapStruct mappers.

### Code generation (Lombok + MapStruct)

Both run as annotation processors at compile time — configured explicitly in `pom.xml`'s `maven-compiler-plugin` (order matters: Lombok before MapStruct). Consequences:

- DTOs/entities use Lombok `@Getter`/`@Setter` etc.; getters/setters are generated, not written.
- Adding a mapping method to a MapStruct interface generates its `*Impl` at build time. After editing mappers, run a build to regenerate.
- Generated sources land in `target/generated-sources/`.

### Persistence

- `spring-boot-starter-data-jpa` is on the classpath but **no datasource is configured** (`application.yaml` only sets the app name). A DB dependency (e.g. H2/PostgreSQL) and datasource config must be added before the app can start against a real database.
