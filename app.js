const inquirer = require('inquirer');
const db = require('./db/connection');
const addQuery = require('./lib/addQueries');
const getQuery = require('./lib/getQueries');

// main inquirer prompt function to provide actions to user
const promptMainMenu = () => {
    inquirer.prompt([
        {
            name: 'action',
            type: 'list',
            message: 'What would you like to do?',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update employee role']
        },
        {
            name: 'department',
            type: 'input',
            message: 'Please enter a name for the new department',
            when: ({ action }) => action === 'Add a department',
        },
        {
            name: 'roleName',
            type: 'input',
            message: 'Please enter the name of this role',
            when: ({ action }) => action === 'Add a role',
        },
        {
            name: 'roleSalary',
            type: 'input',
            message: 'Please enter the salary for this role',
            when: ({ action }) => action === 'Add a role',
            // validate that user input for salary exists and is a number
            validate: (input) => {
                if(input && !isNaN(input)) {
                    return true; 
                } else {
                    console.log('Please enter a valid number!');
                    return false;
                }
            }
        },
        {
            name: 'roleDepartment',
            type: 'list',
            message: 'Please enter the name role name',
            choices: ['Sales', 'Finance', 'Engineering', 'Legal'],
            when: ({ action }) => action === 'Add a role',
        },
    ])
    .then(({ action, ...addPrompts }) => {
        const get = new getQuery;
        const add = new addQuery;
        switch(action) {
            case 'View all departments':
                get.allDepartmentNames();
                break;
            case 'View all roles':
                get.allRoles();
                break;
            case 'View all employees':
                get.allEmployees();
                break;
            case 'Add a department':
                add.department(addPrompts.department);
                break;
            case 'Add a role':
                const { roleName, roleSalary, roleDepartment } = addPrompts;
                add.role(roleName, roleSalary, roleDepartment);
                break;
            default: 
                console.log(addPrompts.department);
        }
    })
    .then(() => {
        // timeout to return to main menu to prevent overlap in console
        setTimeout(promptMainMenu, 300)
    })
};

promptMainMenu();