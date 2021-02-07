const mysql = require('mysql');
const inquirer = require('inquirer');
const express = require('express');
const figlet = require('figlet');
const { Console } = require('console');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'password',
  database: 'employeeDB',
});

console.log('\n')
figlet('Employee Manager', function (err, data) {
  if (err) {
    console.log('Something went wrong...');
    console.dir(err);
    return;
  }
  console.log(data)
  console.log('\n')
});

connection.connect((err) => {
  if (err) throw err;
  runManager();
});

const runManager = () => {
  inquirer
    .prompt({
      type: 'list',
      name: 'question',
      message: 'What would you like to do?',
      choices: [
        'View all Employees',
        'View all Roles',
        'View all Departments',
        'Add Employee',
        'Add Department',
        'Add Role',
        'Update Employee Role',
        'Quit',
      ],
    }).then((answer) => {
      switch (answer.action) {
        case 'View all Employees':
          viewEmployees();
          break;

        case 'View all Roles':
          viewRoles();
          break;

        case 'View all Departments':
          viewDepartments();
          break;

        case 'Add Employee':
          addEmployee();
          break;

        case 'Add Department':
          addDepartment();
          break;

        case 'Add Role':
          addRole();
          break;

        case 'Update Employee Role':
          updateEmployee();
          break;

        default:
          console.log(`Invalid action: ${answer.action}`);
          break;
      }
    });
};

const viewEmployees = () => {
  connection.query('SELECT * FROM employees', (err, res) => {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.log(res);
  });
};
