const inquirer = require('inquirer');
const db = require('./db/connection');
const addQuery = require('./lib/addQueries');
const getQuery = require('./lib/getQueries');
const choiceQuery = require('./lib/choiceQueries');

// get choices from sql query to use in inquirer prompts
const getDepartmentList = () => {
    const getChoices = new choiceQuery;
    const departmentChoices = getChoices.allDepartments();
    return departmentChoices
}

// main inquirer prompts for user input
const promptMainMenu = (choiceList) => {
    return inquirer.prompt([
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
            message: 'Please choose a department for this role',
            choices: getDepartmentList,
            when: ({ action }) => action === 'Add a role',
        }
    ])
};


// main function to initialize application
const init = () => {
    // getChoiceList()
    promptMainMenu()
    .then(({ action, ...addPrompts }) => {
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
        setTimeout(init, 300)
    })
};

init();
// getChoiceList();