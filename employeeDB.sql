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
  FOREIGN KEY (manager_id) REFERENCES employees(id)
);

Insert into departments (department_name) VALUES ("Engineering");
SELECT * FROM departments;

Insert into roles (title, salary, department_id) VALUES ("Software Engineer", "100000", "1");
SELECT * FROM roles;

INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("Mike", "Sasiela", "1", "1");
Select * from employees;



SELECT employees.first_name, employees.last_name, roles.title, roles.salary, departments.department_name
FROM employees, roles, departments
WHERE employees.role_id = roles.id
AND roles.department_id = departments.id;
