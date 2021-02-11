DROP DATABASE IF EXISTS employeeDB;
CREATE database employeeDB;

USE employeeDB;

CREATE TABLE departments (
  id INT AUTO_INCREMENT NOT NULL,
  department_name VARCHAR(30) NULL,
  PRIMARY KEY (id)
);

CREATE TABLE roles (
  id INT AUTO_INCREMENT NOT NULL,
  title VARCHAR(30) NULL,
  salary DECIMAL(10,4) NULL,
  department_id INT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (department_id) REFERENCES departments(id)
);

CREATE TABLE employees (
  id INT AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(30) NULL,
  last_name VARCHAR(30) NULL,
  role_id INT NULL,
  manager_id INT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (role_id) REFERENCES roles(id),
  -- FOREIGN KEY (manager_id) REFERENCES employees(id)
);

Insert into departments (department_name) 
VALUES 
("Engineering"),
("Sales"), 
("HR"), 
("Finance");

Insert into roles (title, salary, department_id) 
VALUES 
("Software Engineer", "100000", "1"), 
("Senior Engineer", "180000", "1"),
("Salesperson", "2"), 
("Sales Lead", "2"),
("HR Generalist", "3"),
("HR Director", "3"),
("Accountant", "4");

INSERT INTO employees (first_name, last_name, role_id, manager_id) 
VALUES 
("Mike", "Sasiela", "1", "2"), 
("Brandon", "Max", "2", null),
("Pat", "Balk", "6", null),
("Kat", "Wething", "5", "3"),
("Mark", "Zuck", "4", null),
("Paul", "Blart", "3", "5"),
("Guy", "Smart", "7", null);

SELECT employees.first_name, employees.last_name, roles.title, roles.salary, departments.department_name, manager_id
FROM employees, roles, departments
WHERE employees.role_id = roles.id
AND roles.department_id = departments.id;