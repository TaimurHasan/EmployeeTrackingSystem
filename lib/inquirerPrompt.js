const inquirer = require('inquirer');
const choiceQuery = require('../queries/choiceQueries');

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
    console.log(`
    ============
     MAIN MENU
    ============
    `)
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

module.exports = promptMainMenu;