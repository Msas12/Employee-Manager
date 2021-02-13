const mysql = require('mysql');
const inquirer = require('inquirer');
const figlet = require('figlet');
const asTable = require('as-table')
const { Console } = require('console');
const { compose } = require('async');


const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'password',
  database: 'employeeDB',
});

connection.connect((err) => {
  if (err) throw err;
  figlet('Employee Manager', function (err, data) {
    if (err) {
      console.log('Something went wrong...');
      console.dir(err);
      return;
    }
    console.log(data)
    console.log('\n')
    runManager()
  })
})


// Prompt user for what they would like to do
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


// Views--------------------------------------------------------------------------------------------------

// View all Employees
const viewEmployees = () => {
  connection.query('SELECT employees.id as "ID", employees.first_name as "First Name", employees.last_name as "Last Name", roles.title as "Position", departments.department_name as "Department", roles.salary as "Salary", CONCAT(m.first_name, " ", m.last_name) as "Manager" FROM employees LEFT JOIN employees m ON m.id = employees.manager_id JOIN roles ON employees.role_id = roles.id JOIN departments ON roles.department_id = departments.id', (err, res) => {
    if (err) throw err

    console.log('\n')
    console.log(asTable(res))
    console.log('\n')
    runManager()
  });
};

// View all Departments
const viewDepartments = () => {
  connection.query('SELECT * FROM departments', (err, res) => {
    if (err) throw err

    console.log('\n')
    console.log(asTable(res))
    console.log('\n')
    runManager()
  })
};

// View all Roles
const viewRoles = () => {
  connection.query('SELECT * FROM roles', (err, res) => {
    if (err) throw err

    console.log('\n')
    console.log(asTable(res))
    console.log('\n')
    runManager()
  })
};



// Adds--------------------------------------------------------------------------------------------------

// Add a Department
const addDepartment = () => {
  inquirer
    .prompt({
      name: 'department',
      type: 'input',
      message: 'Department Name: ',
    })
    .then((answer) => {
      const query = 'INSERT INTO departments (department_name) VALUES (?)';
      connection.query(query, [answer.department], (err, res) => {
        if (err) throw err;

        console.log('\n')
        console.log(`You have succesfully added ${answer.department} to Departments`)
        console.log('\n')
        runManager();
      });
    });
}

// Add a Role
const addRole = () => {
  getDepartments()

  inquirer.prompt([
    {
      name: 'role',
      type: 'input',
      message: 'Role Name: ',
    },
    {
      name: 'salary',
      type: 'input',
      message: 'Salary: ',
    },
    {
      name: 'department',
      type: 'list',
      message: 'Department: ',
      choices: departmentsArry,
    }
  ]).then((answers) => {
    let departmentChoice = departmentsArry.indexOf(answers.department)+1
    
    const query = 'INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)';
    connection.query(query, [answers.role, answers.salary, departmentChoice], (err, res) => {
      if (err) throw err;

      console.log('\n')
      console.log(`You have succesfully added ${answers.role} to Roles`)
      console.log('\n')
      runManager();
    });
  });
}

// // Add an Employee
// const addEmployee = () => {
//   getRoles()
//   getManagers()

//   inquirer.prompt([
//     {
//       name: 'firstname',
//       type: 'input',
//       message: 'First Name: ',
//     },
//     {
//       name: 'lastname',
//       type: 'input',
//       message: 'Last Name: ',
//     },
//     {
//       name: 'role',
//       type: 'list',
//       message: 'Role: ',
//       choices: rolesArry,
//     },
//     {
//       name: 'manager',
//       type: 'list',
//       message: 'Manager: ',
//       choices: managersArry,
//     }
//   ]).then((answers) => {
//     let roleChoice = rolesArry.indexOf(answers.role)+1
//     let managerChoice = managersArry.indexOf(answers.manager)+1
    
//     const query = 'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
//     connection.query(query, [answers.firstname, answers.lastname, roleChoice, managerChoice], (err, res) => {
//       if (err) throw err;

//       console.log('\n')
//       console.log(`You have succesfully added ${answers.firstname} ${answers.lastname} to Employees`)
//       console.log('\n')
//       runManager();
//     });
//   });
// }


// Gets Items to be used for inquirer choices---------------------------------------------------------------

let departmentsArry = []

// Get's Departments and stores them in gloobal departmentsArry
const getDepartments = () => {
  connection.query('SELECT * FROM departments', (err, res) => {
    if (err) throw err
    for (i=0; i<res.length; i++) {
      departmentsArry.push(res[i].department_name)
    }
  })
};

let managersArry = []

// // Get's Managers and stores them in gloobal managersArry
// const getManagers = () => {
//   connection.query('SELECT DISTINCT CONCAT(first_name, " ", last_name) as "Manager" FROM employees WHERE manager_id IS NULL', (err, res) => {
//     if (err) throw err
//     for (i=0; i<res.length; i++) {
//       managersArry.push(res[i].Manager)
//       console.log(managersArry)
//     }
//   })
// };

let rolesArry = []

// Get's Roles and stores them in gloobal rolesArry
const getRoles = () => {
  connection.query('SELECT * FROM roles', (err, res) => {
    if (err) throw err
    for (i=0; i<res.length; i++) {
      rolesArry.push(res[i].title)
    }
  })
};