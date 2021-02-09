const mysql = require('mysql');
const inquirer = require('inquirer');
const figlet = require('figlet');
const hotkeys = require('hotkeys-js');
const { Console } = require('console');


const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'password',
  database: 'employeeDB',
});

connection.connect((err) => {
  if (err) throw err;
  runManager();
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
      switch (answer.question) {
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

        case 'Quit':
          console.log("Thank you for your updates!")
          // hotkeys('ctrl+c', function (event, handler){
          //   return
          // })
          return;

        default:
          console.log(`Invalid action: ${answer.question}`);
          break;
      }
    });
};

const viewEmployees = () => {
  connection.query('SELECT employees.first_name, employees.last_name, roles.title, roles.salary, departments.department_name FROM employees, roles, departments WHERE employees.role_id = roles.id AND roles.department_id = departments.id', (err, res) => {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.table(res);
    runManager();
  });
};


// const addDepartment = () => {

// }