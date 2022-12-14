const inquirer = require("inquirer");
const connection = require("./assets/connection");

//listing choices
function start(){
    inquirer.prompt(
        {
            type: "list",
            message: "What would you like to do?",
            name: "choice",
            choices: [
                "View All Employees",
                "View All Roles",
                "View All Departments",
                "Add Employee",
                "Add Role",
                "Add Department",
                "Update Employee Role",
                "Update Employee Manager",
                "View Employee By Manager",
                "Delete Employee",
                "Delete Role",
                "Delete Department",
                "See Utilized Budget",
                "Exit"
            ]

        }).then(answer => {

            switch (answer.choice) {
                case "View All Employees":
                    viewAllEmployees();
                    break;
                case "View All Roles":
                    viewAllRoles();
                    break;
                case "View All Departments":
                    viewAllDepartments();
                    break;
                case "Add Employee":
                    addEmployee();
                    break;
                case "Add Role":
                    addRole();
                    break;
                case "Add Department":
                    addDepartment();
                    break;
                case "Update Employee Role":
                    updateEmployeeRole();
                    break;
                case "Update Employee Manager":
                    updateEmployeeManager();
                    break;
                case "View Employee By Manager":
                    viewEmployeeByManager();
                    break;
                case "Delete Employee":
                    deleteEmployee();
                    break;
                case "Delete Role":
                    deleteRole()
                    break;
                case "Delete Department":
                    deleteDepartment()
                    break;
                case "See Utilized Budget":
                    utilizedBudget()
                    break;
                case "Exit":
                    connection.end();
                    console.log("Thank you and have a great day");
                    break;
            }
        })
}

function viewAllEmployees(){
    const sql = 
    //"SELECT * FROM employee";
    "SELECT emp.id AS EmployeeID, concat(emp.first_name, ' ', emp.last_name) AS EmployeeName, role.title AS RoleTitle, role.salary AS Salary, department.name AS DepartmentName, concat(manager.first_name, ' ', manager.last_name) AS ManagerName FROM employee AS emp " + 
    "LEFT JOIN employee_db.employee AS manager ON emp.manager_id=manager.id " +
    "LEFT JOIN role ON emp.role_id=role.id " +
    "LEFT JOIN department ON department.id=role.department_id";

    connection.query(sql, (err, res) => {
        if(err) throw err;
        console.table(res);
        start();
    });
}

function viewAllRoles(){
    const sql = 
    "SELECT title as RoleTitle, salary as Salary, department.name as DepartmentName FROM role " + "LEFT JOIN department ON role.department_id=department.id";

    connection.query(sql, (err, res) => {
        if(err) throw err;
        console.table(res);
        start();
    });
}

function viewAllDepartments(){
    const sql = 
    "SELECT * FROM department";
    connection.query(sql, (err, res) => {
        if(err) throw err;
        console.table(res);
        start();
    });
}

function addEmployee(){
    inquirer.prompt([
        {
            type: "input",
            name: "first_name",
            message: "What is the employee's first name?"
        },
        {
            type: "input",
            name: "last_name",
            message: "What is the employee's last name?"
        },
        {
            type: "input",
            name: "manager_id",
            message: "Who is the employee's manager? Add manager's ID",
        },
        {
            type: "input",
            name: "role_id",
            message: "What is the new employee's role? Add role ID",
        },
    ])
    .then(answers => {

        connection.query("INSERT INTO employee SET ? ",
            {
                first_name: answers.first_name,
                last_name: answers.last_name,
                manager_id: answers.manager_id,
                role_id: answers.role_id
            }, (err, res) => {
            if(err) throw err;
            start();
        });
    })

    
}

function addRole(){
    inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "What is the name of the new role?"
        },
        {
            type: "input",
            name: "salary",
            message: "What is the salary of the role?"
        },
        {
            type: "input",
            name: "department_id",
            message: "Which department does the role belong to? Add department's ID",
        }
    ])
    .then(answers => {

        connection.query("INSERT INTO role SET ? ",
            {
                title: answers.title,
                salary: answers.salary,
                department_id: answers.department_id
            }, (err, res) => {
            if(err) throw err;
            start();
        });
    })

    
}

function addDepartment(){
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the name of the new department?"
        }
    ])
    .then(answers => {

        connection.query("INSERT INTO department SET ? ",
            {
                name: answers.name
            }, (err, res) => {
            if(err) throw err;
            start();
        });
    })

    
}

function updateEmployeeRole(){
    connection.query("SELECT employee.id, first_name, last_name, title, role_id FROM employee JOIN role ON role_id=role.id", (err,res) => {
        if(err) throw err;

        var employeeList = [];
        res.forEach(employee => {employeeList.push(employee.id + ": " + employee.first_name + " " + employee.last_name)});

        var roleChoices = [];
        res.forEach(role => {roleChoices.push(role.role_id + ": " + role.title)});

        inquirer.prompt([
            {
                type: "list",
                name: "employee",
                message: "Which employee would you like to change roles?",
                choices: employeeList
            },
            {
                type: "list",
                name: "role",
                message: "Which role would you like to change the employee to?",
                choices: roleChoices
            }

        ])
        .then(answers => {


            connection.query("UPDATE employee SET ? WHERE ?",
            [ 
                {
                    role_id: answers.role[0],
                },
                {
                    id: answers.employee[0],
                }
            ],
            (err,res) => {
                if (err) throw err;
                start();
            });
        })
    })
}

//Bonus
//Update employee managers.
function updateEmployeeManager(){
    connection.query("SELECT id, first_name, last_name, manager_id FROM employee", (err,res) => {
        if(err) throw err;

        var employeeList = [];
        res.forEach(employee => {employeeList.push(employee.id + ": " + employee.first_name + " " + employee.last_name)});

        inquirer.prompt([
            {
                type: "list",
                name: "employee",
                message: "Which employee would you like to change manager?",
                choices: employeeList
            },
            {
                type: "list",
                name: "manager",
                message: "Which manager would you like to change the employee to?",
                choices: employeeList
            }

        ])
        .then(answers => {


            connection.query("UPDATE employee SET ? WHERE ?",
            [ 
                {
                    manager_id: answers.manager[0],
                },
                {
                    id: answers.employee[0],
                }
            ],
            (err,res) => {
                if (err) throw err;
                start();
            });
        })
    })
}

//View employees by manager.
function viewEmployeeByManager(){
    connection.query("SELECT * FROM employee", (err,res) => {
        if(err) throw err;

        var managerList = [];
        res.forEach(employee => {managerList.push(employee.id + ": " + employee.first_name + " " + employee.last_name)});
        
        inquirer.prompt([
            {
                type: "list",
                name: "manager",
                message: "Which manager would you like to view their employees?",
                choices: managerList
            }
        ])
        .then(answers => {
            connection.query("SELECT * FROM employee WHERE ?",
             
                {
                    manager_id: parseInt(answers.manager[0])
                }
            ,
            (err,res) => {
                if (err) throw err;
                console.table(res);
                start();
            });
        })
    })
}

//Delete departments, roles, and employees.
function deleteEmployee(){
    connection.query("SELECT * FROM employee", (err,res) => {
        if(err) throw err;

        var employeeList = [];
        res.forEach(employee => {employeeList.push(employee.id + ": " + employee.first_name + " " + employee.last_name)});

        inquirer.prompt([
            {
                type: "list",
                name: "employee",
                message: "Which employee would you like to remove?",
                choices: employeeList
            }
        ])
        .then(answers => {
            connection.query("DELETE FROM employee WHERE ?",
            [ 
                {
                    id: answers.employee[0],
                }
            ],
            (err,res) => {
                if (err) throw err;
                start();
            });
        })
    })
}

function deleteRole(){
    connection.query("SELECT * FROM role", (err,res) => {
        if(err) throw err;

        var roleList = [];
        res.forEach(role => {roleList.push(role.id + ": " + role.title)});

        inquirer.prompt([
            {
                type: "list",
                name: "role",
                message: "Which employee would you like to remove?",
                choices: roleList
            }
        ])
        .then(answers => {
            connection.query("DELETE FROM role WHERE ?",
            [ 
                {
                    id: answers.role[0],
                }
            ],
            (err,res) => {
                if (err) throw err;
                start();
            });
        })
    })
}

function deleteDepartment(){
    connection.query("SELECT * FROM department", (err,res) => {
        if(err) throw err;

        var departmentList = [];
        res.forEach(department => {departmentList.push(department.id + ": " + department.name)});

        inquirer.prompt([
            {
                type: "list",
                name: "department",
                message: "Which employee would you like to remove?",
                choices: departmentList
            }
        ])
        .then(answers => {
            connection.query("DELETE FROM department WHERE ?",
            [ 
                {
                    id: answers.department[0],
                }
            ],
            (err,res) => {
                if (err) throw err;
                start();
            });
        })
    })
}

//View the total utilized budget of a department.
function utilizedBudget(){
    connection.query("SELECT * FROM department", (err,res) => {
        if(err) throw err;

        var departmentList = [];
        res.forEach(department => {departmentList.push(department.id + ": " + department.name)});

        inquirer.prompt([
            {
                type: "list",
                name: "department",
                message: "Which department would you like to the utilized budget of?",
                choices: departmentList
            }
        ])
        .then(answers => {
            connection.query("SELECT salary FROM employee JOIN role ON role_id=role.id WHERE ?",
            [ 
                {
                    department_id: answers.department[0],
                }
            ],
            (err,res) => {
                let totalSalary = 0;
                res.forEach(salary => totalSalary += salary.salary)
                console.log("The total utilized budget for the request department is : " + totalSalary);
                if (err) throw err;
                start();
            });
        })
    })
}

connection.connect((err) => {
    if (err) throw err;
    start();
});