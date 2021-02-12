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
  FOREIGN KEY (role_id) REFERENCES roles(id)
);

Insert into departments (department_name) 
VALUES 
("Engineering"),
("Sales"), 
("HR"), 
("Finance");

Insert into roles (title, salary, department_id) 
VALUES 
("Software Engineer", "130000", "1"), 
("Senior Engineer", "180000", "1"),
("Salesperson", "65000", "2"), 
("Sales Lead", "80000", "2"),
("HR Generalist", "70000", "3"),
("HR Director", "120000", "3"),
("Director of Accountanting", "200000", "4");

INSERT INTO employees (first_name, last_name, role_id, manager_id) 
VALUES 
("Mike", "Sasiela", "1", "2"), 
("Brandon", "Max", "2", null),
("Pat", "Balk", "6", null),
("Kat", "Wething", "5", "3"),
("Mark", "Zuck", "4", null),
("Paul", "Blart", "3", "5"),
("Guy", "Smart", "7", null);


SELECT employees.id as "ID", employees.first_name as "First Name", employees.last_name as "Last Name", roles.title as "Position", departments.department_name as "Department", roles.salary as "Salary", CONCAT(m.first_name, " ", m.last_name) as "Manager" FROM employees LEFT JOIN employees m ON m.id = employees.manager_id JOIN roles ON employees.role_id = roles.id JOIN departments ON roles.department_id = departments.id;