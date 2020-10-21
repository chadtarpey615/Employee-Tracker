const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Sony1234",
    database: "employees_db"
});


connection.connect(function (err) {
    if (err) throw err;
    start();
})


function start() {
    inquirer.prompt([
        {
            name: "userChoice",
            type: "list",
            message: "What would you like to do?",
            choices: ["View all employees", "View all employees by Department", "View all employees by Manager", "Add Employee", "Remove Employee", "Update Employee Role", "Update Employee Manager", "View All Roles"]
        }])
        .then(data => {
            switch (data.userChoice) {
                case "View all employees":
                    viewEmployees();
                    break;

                case "View all employees by Department":
                    byDepartment();
                    break;

                case "View all employees by Manager":
                    byManager();
                    break;

                case "Add Employee":
                    addEmployee();
                    break;

                case "Remove Employee":
                    removeEmployee();
                    break;

                case "Update Employee Role":
                    updateRole();
                    break;

                case "Update Employee Manager":
                    updateManager();
                    break;

                case "View All Roles":
                    viewRoles();
                    break;

                default: start();
            }
        })
}

function viewEmployees() {
    connection.query("SElECT employee.id, first_name, last_name, roles.title FROM employee LEFT JOIN roles ON role_id = roles.id", (err, res) => {
        if (err) throw err
        console.log("\n");
        console.table(res);
    });
};

function byDepartment() {
    connection.query("SELECT employee.id, first_name, last_name, department.dept_name FROM employee LEFT JOIN roles ON role_id = roles.id LEFT JOIN department ON department_id = department.id", (err, res) =>{
        if (err) throw err
        console.log("\n");
        console.table(res);
    });
}

function byManager() {

};

function addEmployee() {
    inquirer.prompt([
        {
            name: "firstName",
            type: "input",
            message: "What is the first name of the employee"


    },
    {
        name: "lastName",
        type: "input",
        message: "What is the last name of the employee"
    },
    {
        name: "role",
        type: "list",
        message: "What is the employee's role",
        choices: ['SalesPerson', "Sales Lead", "Lead Engineer", "Software Engineer", "Accountant", "Lawyer", "Legal Team Lead"]
    },
    {
        name: "manager",
        type: "list",
        message: "What is the employee's manager "
    }

]).then(data => {
    connection.query("INSERT INTO employee SET ?", {
        fisrt_name: data.fisrtName,
        last_name: data.lastName
        
    },
    function(err) {
        if (err) throw err;
        console.log("Your employee was created successfully!");
        // re-prompt the user for if they want to bid or post
        start();
      }
    );
        
    
});
}

function removeEmployee() {
    inquirer.prompt([
        {
            type: "input",
            name: "removeName",
            message: "What is the name of the employee you want to remove"
        }
    ]).then(data => {
        connection.query("")
    })
};

function updateRole() {
    inquirer.prompt([
        {
            type: "input",
            name: "updateNmae",
            message: "Whats the name of the employee you want to change roles"
        },
        {
            type: "list",
            name: "updateRole",
            message: "Whicn new role for this employee",
            choices: ['SalesPerson', "Sales Lead", "Lead Engineer", "Software Engineer", "Accountant", "Lawyer", "Engineering", "Legal Team Lead"]
        }
    ]).then(data => {
        connection.query()
    })
};

function updateManager() {

};

function viewRoles() {

};
var example = ["roles", "role2..."]
let roleID = example.indexOf("roles") +1;

//update where role.id = roleID variable