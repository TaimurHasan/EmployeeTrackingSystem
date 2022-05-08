const inquirer = require('inquirer');
const db = require('./db/connection');
const addQuery = require('./queries/addQueries');
const getQuery = require('./queries/getQueries');
const updateQuery = require('./queries/updateQueries')
const choiceQuery = require('./queries/choiceQueries');

// get department choices from sql query to use in inquirer prompts
const getDepartmentList = () => {
    const getChoices = new choiceQuery;
    
    // contain needed choice list
    const choices = getChoices.allDepartments()
    // return departmentChoices
    return choices;
};

// get role choices from sql query to use in inquirer prompts
const getRoleList = () => {
    const getChoices = new choiceQuery;
    
    // contain needed choice list
    const choices = getChoices.allRoles()
    // return roleChoices
    return choices;
};

// get manager choices from sql query to use in inquirer prompts
const getManagerList = () => {
    const getChoices = new choiceQuery;
    
    // contain needed choice list
    const choices = getChoices.allEmployees()
    // return managerChoices
    return choices;
};

// main inquirer prompts for user input
const promptMainMenu = () => {
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
        },
        {
            name: 'employeeFirstName',
            type: 'input',
            message: 'Please enter this employee\'s first name',
            when: ({ action }) => action === 'Add an employee',
        },
        {
            name: 'employeeLastName',
            type: 'input',
            message: 'Please enter this employee\'s last name',
            when: ({ action }) => action === 'Add an employee',
        },
        {
            name: 'employeeRole',
            type: 'list',
            message: 'Please choose this employee\'s role',
            choices: getRoleList,
            when: ({ action }) => action === 'Add an employee',
        },
        {
            name: 'employeeManager',
            type: 'list',
            message: 'Please choose this employee\'s manager',
            choices: getManagerList,
            when: ({ action }) => action === 'Add an employee',
        },
        {
            name: 'employeeToUpdate',
            type: 'list',
            message: 'Please choose the employee you wish to update',
            choices: getManagerList,
            when: ({ action }) => action === 'Update employee role',
        },
        {
            name: 'employeeNewRole',
            type: 'list',
            message: 'Please choose this employee\'s new role',
            choices: getRoleList,
            when: ({ action }) => action === 'Update employee role',
        }
    ])
};


// main function to initialize application
const init = () => {
    promptMainMenu()
    .then(({ action, ...addPrompts }) => {
        const get = new getQuery;
        const add = new addQuery;
        const update = new updateQuery;

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
            case 'Add an employee':
                const { employeeFirstName, employeeLastName, employeeRole, employeeManager } = addPrompts;
                add.employee(employeeFirstName, employeeLastName, employeeRole, employeeManager);
                break;
            case 'Update employee role':
                const { employeeToUpdate, employeeNewRole } = addPrompts;
                update.employee(employeeToUpdate, employeeNewRole);
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

// initalize app
init();