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
            when: ({ action }) => action === 'Add a department'
        }
    ])
    .then(({ action, ...addPrompt }) => {
        const get = new getQuery;
        const add = new addQuery;
        switch(action) {
            case 'View all departments':
                get.allDepartments();
                break;
            case 'View all roles':
                get.allRoles();
                break;
            case 'View all employees':
                get.allEmployees();
                break;
            case 'Add a department':
                add.department(addPrompt.department);
                break;
            default: 
                console.log(addPrompt.department);
        }
    })
    .then(() => {
        // timeout to return to main menu to prevent overlap in console
        setTimeout(promptMainMenu, 300)
    })
};

promptMainMenu();