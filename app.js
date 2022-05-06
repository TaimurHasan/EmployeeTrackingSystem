const inquirer = require('inquirer');
const db = require('./db/connection');
const orgQuery = require('./lib/queries');

// main inquirer prompt function to provide actions to user
inquirer.prompt([
    {
        name: 'action',
        type: 'list',
        message: 'What would you like to do?',
        choices: ['View all departments', 'View all roles', 'View all employees', 'add a department', 'add a role', 'add an employee', 'update employee role']
    }
])
.then(({ action }) => {
    const step = new orgQuery;
    step.getAllDepartments();
});