# emp-tracker

## Description

This app would be used by any business owner to be able to view and manage their company. It will assist the owner to keep track and organize their departments, roles, and employees of the company in one system. The owner can add, delete, and view the departments and make changes as needed. 

## Acceptance Criteria

GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database

## Installation
- npm i inquirer@8.2.4
- npm i mysql2
- npm i console.table


## Mock-Up

[![Boot Camp Mock-up](./Assets/12-sql-homework-video-thumbnail.png)](https://2u-20.wistia.com/medias/2lnle7xnpk)

## Demonstartion Video

[Demo Video](https://drive.google.com/file/d/1fFzH_ODlrpqc_5wRY0kR--4Oq8saR_U6/view?usp=share_link)

## GitHub Link

https://github.com/Valeryo145/emp-tracker
