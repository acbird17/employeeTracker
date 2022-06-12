// const connection = require("./db/connection");
const inquirer = require("inquirer");
const ctable = require("console.table");
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "employee_db",
});
db.connect(function (err) {
  if (err) throw err;
  console.log(`Connected to the courses_db database.`);
  initialize();
});

const initialize = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "initPrompt",
        message: "Please make a selection?",
        choices: [
          "View Employees",
          "View Employees by Department",
          "View Employees by Role",
          "Add an Employee",
          "Update an Employee's Role",
          "Remove an Employee",
          "Exit",
        ],
      },
    ])
    .then((answer) => {
      switch (answer.initPrompt) {
        case "View Employees":
          viewEmployees();
          break;
        case "View Employees by Department":
          viewDeparments();
          break;
        case "View Employees by Role":
          viewRoles();
          break;
        case "Add an Employee":
          addEmployee();
          break;
        case "Update an Employee's Role":
          updateEmployee();
          break;
        case "Remove an Employee":
          deleteEmployee();
          break;
        default:
          db.end();
      }
    });
};

const viewEmployees = () => {
  const query =
    "SELECT DISTINCT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id;";
  db.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    initialize();
  });
};

const viewDeparments = () => {
  const query = "SELECT * FROM department;";
  db.query(query, (err, res) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "response",
          type: "list",
          message: "Which Department would you like to view?",
          choices: () => {
            var responseArray = [];
            for (const item of res) {
              responseArray.push(item.name);
            }
            return responseArray;
          },
        },
      ])
      .then((data) => {
        const query =
          "SELECT employee.id, employee.first_name, employee.last_name, role.title , department.name, role.salary FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id WHERE ?;";
        db.query(
          query,
          [
            {
              "department.name": data.response,
            },
          ],
          (err, res) => {
            if (err) throw err;
            console.table(res);
            initialize();
          }
        );
      });
  });
};

const viewRoles = () => {
  const query = "SELECT * FROM role;";
  db.query(query, (err, res) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "response",
          type: "list",
          message: "Which Role would you like to view?",
          choices: () => {
            var responseArray = [];
            for (const item of res) {
              responseArray.push(item.title);
            }
            return responseArray;
          },
        },
      ])
      .then((data) => {
        const query =
          "SELECT employee.id, employee.first_name, employee.last_name, role.title , department.name, role.salary FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id WHERE ?;";
        db.query(
          query,
          [
            {
              "role.title": data.response,
            },
          ],
          (err, res) => {
            if (err) throw err;
            console.table(res);
            initialize();
          }
        );
      });
  });
};

const addEmployee = () => {
  inquirer
    .prompt([
      {
        name: "firstName",
        type: "input",
        message: "What is the Employees First Name?",
      },
      {
        name: "lastName",
        type: "input",
        message: "What is the Employees Last Name?",
      },
      {
        name: "titles",
        type: "list",
        message: "What is this employee's title?",
        choices: [
          "Sales Lead",
          "Salesperson",
          "Lead Engineer",
          "Software Engineer",
          "Account Manager",
          "Accountant",
          "Legal Team Lead",
          "Lawyer",
        ],
      },
    ])
    .then((data) => {
      switch (data.titles) {
        case "Sales Lead":
          var roleID = 1;
          break;
        case "Salesperson":
          var roleID = 2;
          break;
        case "Lead Engineer":
          var roleID = 3;
          break;
        case "Software Engineer":
          var roleID = 4;
          break;
        case "Account Manager":
          var roleID = 5;
          break;
        case "Accountant":
          var roleID = 6;
          break;
        case "Legal Team Lead":
          var roleID = 7;
          break;
        case "Lawyer":
          var roleID = 8;
          break;
      }

      const query = "INSERT INTO employee SET ?;";
      db.query(
        query,
        {
          first_name: data.firstName,
          last_name: data.lastName,
          role_id: roleID,
        },
        (err) => {
          if (err) throw err;
          console.log("Employee Added!");
          initialize();
        }
      );
    });
};

const updateEmployee = () => {
  const query =
    "SELECT CONCAT(first_name, ' ', last_name) as name FROM employee;";
  db.query(query, (err, res) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          type: "list",
          message: "Which Employee would you like to update?",
          name: "selectedEmployee",
          choices: () => {
            var responseArray = [];
            for (const item of res) {
              responseArray.push(item.name);
            }
            return responseArray;
          },
        },
        {
          name: "titles",
          type: "list",
          message: "What is this employee's title?",
          choices: [
            "Sales Lead",
            "Salesperson",
            "Lead Engineer",
            "Software Engineer",
            "Account Manager",
            "Accountant",
            "Legal Team Lead",
            "Lawyer",
          ],
        },
      ])
      .then((data) => {
        switch (data.titles) {
          case "Sales Lead":
            var roleID = 1;
            break;
          case "Salesperson":
            var roleID = 2;
            break;
          case "Lead Engineer":
            var roleID = 3;
            break;
          case "Software Engineer":
            var roleID = 4;
            break;
          case "Account Manager":
            var roleID = 5;
            break;
          case "Accountant":
            var roleID = 6;
            break;
          case "Legal Team Lead":
            var roleID = 7;
            break;
          case "Lawyer":
            var roleID = 8;
            break;
        }
        const emp = data.selectedEmployee.split(" ");
        const query = "UPDATE employee SET ? WHERE ? AND ?";
        db.query(
          query,
          [
            {
              role_id: roleID,
            },
            {
              first_name: emp[0],
            },
            {
              last_name: emp[1],
            },
          ],
          (err) => {
            if (err) throw err;
            console.log("Employee Updated!");
            initialize();
          }
        );
      });
  });
};

const deleteEmployee = () => {
  const query =
    "SELECT CONCAT(first_name, ' ', last_name) as name FROM employee;";
  db.query(query, (err, res) => {
    if (err) throw err;
    inquirer
      .prompt({
        type: "list",
        message: "Which Employee would you like to delete?",
        name: "selectedEmployee",
        choices: () => {
          var responseArray = [];
          for (const item of res) {
            responseArray.push(item.name);
          }
          return responseArray;
        },
      })
      .then((data) => {
        const emp = data.selectedEmployee.split(" ");
        const query = "DELETE FROM employee WHERE ? AND ?";
        db.query(
          query,
          [
            {
              first_name: emp[0],
            },
            {
              last_name: emp[1],
            },
          ],
          (err) => {
            if (err) throw err;
            console.log("Employee Deleted!");
            initialize();
          }
        );
      });
  });
};
