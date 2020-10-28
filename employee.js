const inquirer = require("inquirer");
const connection = require("./connection.js");
const choices = ["View all employees", "View all employees by Department", "View all Departments", "Add Employee", "Update Employee Role", "View All employees Roles", "View All Roles", "Add Role", "Add Department"]
const table = require("console.table");



function start() {
    inquirer.prompt([
        {
            name: "userChoice",
            type: "list",
            message: "What would you like to do?",
            choices: choices
        }])
        .then(data => {
            switch (data.userChoice) {
                case "View all employees":
                    viewEmployees();
                    break;

                case "View all employees by Department":
                    empDepartment();
                    break;

                case "View all Departments":
                    byDepartment();
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

                case "View All employees Roles":
                    empRoles();
                    break;

                case "View All Roles":
                    viewRoles();
                    break;

                case "Add Role":
                    addRole();
                    break;

                case "Add Department":
                    addDepartment();
                    break;

                default: start();
            }
        })
}

         // view all employees
         
function viewEmployees() {
    connection.query("SElECT employee.id, first_name, last_name, manager_id, roles.title FROM employee LEFT JOIN roles ON role_id = roles.id", (err, res) => {
        if (err) throw err
        console.log("\n");
        console.table(res);
        start();

    });
};

          //  view departments

function empDepartment() {
    connection.query("SELECT employee.id, first_name, last_name, department.dept_name FROM employee LEFT JOIN roles ON role_id = roles.id LEFT JOIN department ON department_id = department.id", (err, res) => {
        if (err) throw err
        console.log("\n");
        console.table(res);
        start();

    });

}

function byDepartment() {
    connection.query("SELECT * FROM department", (err, res) => {
        if (err) throw err
        console.log("\n");
        console.table(res);
        start();

    });

}

           // Add employees

function addEmployee() {

    let choices = ["SalesPerson", "Sales Lead", "Lead Engineer", "Software Engineer", "Accountant", "Lawyer", "Legal Team Lead"]

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
            choices: choices
        },
        // {
        //     name: "manager",
        //     type: "list",
        //     message: "What is the employee's manager ",
        //     choice: chooseManager()
        // }

    ]).then(data => {
        connection.query("INSERT INTO employee SET ?", {
            first_name: data.firstName,
            last_name: data.lastName,
            role_id: choices.indexOf(data.role) + 1
        },



            function (err) {
                if (err) throw err;
                console.log("Your employee was created successfully!");

                start();
            }
        );



    });
}

// function removeEmployee() {
//     inquirer.prompt([
//         {
//             type: "input",
//             name: "removeName",
//             message: "What is the name of the employee you want to remove"
//         }
//     ]).then(data => {
//         connection.query("DELETE FROM employee WHERE ?", {
//         })
//     })
// };

                // Update employees roles

function updateRole() {
    let choices = ["SalesPerson", "Sales Lead", "Lead Engineer", "Software Engineer", "Accountant", "Lawyer", "Legal Team Lead"]

    connection.query(
        "SELECT employee.last_name, roles.title FROM employee LEFT JOIN roles ON role_id = roles.id;",

        function (err, res) {
            // console.log(res)
            if (err) throw err;
            console.log(res);
            inquirer
                .prompt([
                    {
                        name: "lastName",
                        type: "rawlist",
                        choices: function () {
                            var lastName = [];
                            for (var i = 0; i < res.length; i++) {
                                lastName.push(res[i].last_name);
                            }
                            return lastName;
                        },
                        message: "What is the Employee's last name? ",
                    },
                    {
                        name: "role",
                        type: "rawlist",
                        message: "What is the Employees new title? ",
                        choices: choices,
                    },
                ])
                .then(function (val) {
                    let roleId = choices.indexOf(val.role) + 1;
                    connection.query(
                        "UPDATE employee SET role_id = ? WHERE last_name = ?", [roleId, val.lastName],

                        async function (err) {
                            if (err) throw err;
                            console.table(val);
                            start();
                        }
                    );
                });
        }
    );
}


//   let managers = [];
//   function chooseManager() {
//     connection.query("SELECT first_name, last_name FROM employee WHERE manager_id IS NULL", function(err, res) {
//       if (err) throw err
//       for (let i = 0; i < res.length; i++) {
//         managers.push(res[i].first_name);
//       }
//     })
//     return managers;
//   }



function empRoles() {
    connection.query("SELECT employee.id, first_name, last_name, roles.title FROM employee LEFT JOIN roles ON role_id = roles.id", (err, res) => {
        if (err) throw err
        console.log("\n");
        console.table(res);
        start();
    });
};

function viewRoles() {
    connection.query("SELECT * FROM roles", (err, res) => {
        if (err) throw err
        console.log("\n");
        console.table(res);
        start();
    });
};

                  // Add new roles
function addRole() {
    connection.query("SELECT roles.title AS Title, roles.salary AS Salary FROM roles", function (err, res) {
        inquirer.prompt([
            {
                name: "Title",
                type: "input",
                message: "What is the roles Title?"
            },
            {
                name: "Salary",
                type: "input",
                message: "What is the Salary?"
            }
        ]).then(function (res) {
            connection.query(
                "INSERT INTO roles SET ?",
                {
                    title: res.Title,
                    salary: res.Salary,
                },
                function (err) {
                    if (err) throw err
                    console.table(res);
                    start();
                }
            )
        });
    });
}

               // Add new departments

function addDepartment() {
    inquirer.prompt([
        {
            name: "department",
            type: "input",
            message: "What department would you like to add?"
        }]).then(res => {
            connection.query("INSERT INTO department SET ?", { dept_name: res.department },

                async function (err) {
                    if (err) throw err;
                    console.table(res);
                    start();
                })
        })

}

start();

