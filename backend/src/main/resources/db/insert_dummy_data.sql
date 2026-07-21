-- Departments
INSERT INTO departments (id, name) VALUES (1, 'Engineering');
INSERT INTO departments (id, name) VALUES (2, 'Human Resources');
INSERT INTO departments (id, name) VALUES (3, 'Finance');
INSERT INTO departments (id, name) VALUES (4, 'Marketing');
INSERT INTO departments (id, name) VALUES (5, 'Sales');
INSERT INTO departments (id, name) VALUES (6, 'Operations');
INSERT INTO departments (id, name) VALUES (7, 'Customer Support');
INSERT INTO departments (id, name) VALUES (8, 'Information Technology');
INSERT INTO departments (id, name) VALUES (9, 'Legal');
INSERT INTO departments (id, name) VALUES (10, 'Research & Development');

-- Employees
INSERT INTO employees (name, email_id, department_id, status) VALUES ('John Doe', 'john.doe@example.com', 1, 'ACTIVE');
INSERT INTO employees (name, email_id, department_id, status) VALUES ('Jane Smith', 'jane.smith@example.com', 2, 'ACTIVE');
INSERT INTO employees (name, email_id, department_id, status) VALUES ('Michael Johnson', 'michael.johnson@example.com', 3, 'ACTIVE');
INSERT INTO employees (name, email_id, department_id, status) VALUES ('Emily Davis', 'emily.davis@example.com', 4, 'INACTIVE');
INSERT INTO employees (name, email_id, department_id, status) VALUES ('David Wilson', 'david.wilson@example.com', 5, 'INACTIVE');
INSERT INTO employees (name, email_id, department_id, status) VALUES ('Sophia Brown', 'sophia.brown@example.com', 6, 'INACTIVE');
INSERT INTO employees (name, email_id, department_id, status) VALUES ('Daniel Taylor', 'daniel.taylor@example.com', 7, 'ACTIVE');
INSERT INTO employees (name, email_id, department_id, status) VALUES ('Olivia Anderson', 'olivia.anderson@example.com', 8, 'ACTIVE');
INSERT INTO employees (name, email_id, department_id, status) VALUES ('James Thomas', 'james.thomas@example.com', 9, 'ACTIVE');
INSERT INTO employees (name, email_id, department_id, status) VALUES ('Emma Martinez', 'emma.martinez@example.com', 10, 'ACTIVE');
INSERT INTO employees (name, email_id, department_id, status) VALUES ('William Jackson', 'william.jackson@example.com', 1, 'ACTIVE');
INSERT INTO employees (name, email_id, department_id, status) VALUES ('Ava White', 'ava.white@example.com', 2, 'ACTIVE');
INSERT INTO employees (name, email_id, department_id, status) VALUES ('Benjamin Harris', 'benjamin.harris@example.com', 3, 'INACTIVE');
INSERT INTO employees (name, email_id, department_id, status) VALUES ('Charlotte Martin', 'charlotte.martin@example.com', 4, 'ACTIVE');
INSERT INTO employees (name, email_id, department_id, status) VALUES ('Lucas Thompson', 'lucas.thompson@example.com', 5, 'ACTIVE');
INSERT INTO employees (name, email_id, department_id, status) VALUES ('Mia Garcia', 'mia.garcia@example.com', 6, 'INACTIVE');
INSERT INTO employees (name, email_id, department_id, status) VALUES ('Henry Clark', 'henry.clark@example.com', 7, 'ACTIVE');
INSERT INTO employees (name, email_id, department_id, status) VALUES ('Amelia Lewis', 'amelia.lewis@example.com', 8, 'INACTIVE');
INSERT INTO employees (name, email_id, department_id, status) VALUES ('Ethan Walker', 'ethan.walker@example.com', 9, 'INACTIVE');
INSERT INTO employees (name, email_id, department_id, status) VALUES ('Isabella Hall', 'isabella.hall@example.com', 10, 'ACTIVE');


-- INSERT dummy Admin user
INSERT INTO roles (id, name)
VALUES
    (1, 'ADMIN'),
    (2, 'USER');

-- Insert admin user
-- Password: admin123
INSERT INTO users (id, username, password)
VALUES (
    1,
    'admin',
    '$2a$10$oKHR1LmL69S3By540uVro.xsBMIlXbqChJzOK6YPMZgp2YvxLuaqC'
);

INSERT INTO user_roles (user_id, role_id)
VALUES (1, 1);

-- Insert normal user
-- Password: user123
INSERT INTO users (id, username, password)
VALUES (
    2,
    'user',
    '$2a$10$Niy1iCB0KJim4q7dVMN9Z.JEgZhBzl5V84mwkHDaZHPxxwYz/7P3q'
);

-- Assign ADMIN role to admin user
INSERT INTO user_roles (user_id, role_id)
VALUES (2, 2);