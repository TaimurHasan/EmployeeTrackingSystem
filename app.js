const inquirer = require('inquirer');
const db = require('./db/connection');
const orgQuery = require('./lib/queries');

// main inquirer prompt function to provide actions to user
const promptMainMenu = () => {
    inquirer.prompt([
    {
        name: 'action',
        type: 'list',
        message: 'What would you like to do?',
        choices: ['View all departments', 'View all roles', 'View all employees', 'add a department', 'add a role', 'add an employee', 'update employee role']
    }
    ])
    .then(({ action }) => {
        const queryObj = new orgQuery;
        switch(action) {
            case 'View all departments':
                queryObj.getAllDepartments();
                break;
            case 'View all roles':
                queryObj.getAllRoles();
                break;
            default: 
                console.log('Pending');
        }
    });
};

promptMainMenu();