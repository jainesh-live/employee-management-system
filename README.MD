# Employee Management System

A full-stack Employee Management application built with **Spring Boot** on the backend and **React + Vite** on the frontend. The repository demonstrates RESTful API design, CRUD operations for employees and departments, and a responsive Bootstrap-based interface.

## Tech Stack

### Backend

* Java 21
* Spring Boot 4
* Spring Data JPA
* Hibernate
* MySQL
* Maven
* SpringDoc OpenAPI (Swagger)
* MapStruct
* Lombok

### Frontend

* React 19
* Vite
* React Router
* Bootstrap 5
* Native Fetch API

## Features

* List all employees
* View employee details
* Add a new employee
* Edit employee information
* Delete an employee
* List all departments
* View department details
* Add and update departments
* Responsive Bootstrap UI
* RESTful API endpoints
* Swagger/OpenAPI documentation

## Repository Structure with main conponents (mono-repo)

```text
employee-management-system/
├── backend/
│   ├── src/main/java/com/hello/employee_mgmt/
│   │   ├── EmployeeMgmtApplication.java
│   │   ├── apis/                # REST controllers
│   │   ├── configs/             # configuration classes
│   │   ├── dto/                 # request/response DTOs
│   │   ├── entity/              # JPA entities
│   │   ├── mappers/             # MapStruct mappers
│   │   ├── repo/                # Spring Data repositories
│   │   └── services/            # business logic services
│   ├── src/main/resources/      # application.yaml and SQL seed data
│   ├── pom.xml
│   └── mvnw
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── components/          # reusable UI components
│   │   ├── pages/               # route pages
│   │   ├── services/            # API service modules
│   │   ├── css/                 # component styles
│   │   ├── App.css
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
└── README.MD
```

## Prerequisites

* Java 21+
* Node.js 20+
* Maven 3.9+
* MySQL 8+

## Backend Setup

1. Open the backend folder:

```bash
cd backend
```

2. Update database credentials in `src/main/resources/application.yaml` if needed.

3. Start the backend:

```bash
./mvnw spring-boot:run
```

The backend runs at:

```text
http://localhost:8080
```

## Frontend Setup

1. Open the frontend folder:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The frontend runs at:

```text
http://localhost:5173
```

### Serve UI with Docker + Nginx

To serve the built website using Nginx in a Docker container:

1. Build the frontend production bundle first:

   ```bash
   npm run build
   ```

2. Start the container with Docker Compose:

   ```bash
   docker compose up --build -d
   ```

3. Open the app in your browser at:

   ```text
   http://localhost
   ```

- The Compose file in [docker-compose.yml](docker-compose.yml) mounts the built files from the dist folder and uses the Nginx configuration from [docker/nginx.conf](docker/nginx.conf). 
- That Nginx config forwards requests under /api/ to the backend host at http://host.docker.internal:8080/ so the frontend can reach the API from inside the container. 
- You can replace this value with any other API base URL where your backend is running.

To stop the container later, run:

```bash
docker compose down
```

## API Documentation

With the backend running, Swagger UI is available at:

```text
http://localhost:8080/swagger-ui/index.html
```

OpenAPI spec:

```text
http://localhost:8080/v3/api-docs
```

## Notes

* The backend is configured to seed dummy data from `src/main/resources/db/insert_dummy_data.sql`.
* The frontend uses the browser `fetch` API for HTTP calls, not Axios.
* Bootstrap styles are loaded in `frontend/src/main.jsx`.

## Improvements

Potential future enhancements:

* Authentication and authorization
* Pagination, sorting, and filtering
* Better validation and global error handling
* Docker support for backend and frontend
* Unit and integration tests
* Role-based access control
* CI/CD automation

## License

This project is intended for learning and portfolio use.
