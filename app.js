const promptMainMenu = require('./lib/inquirerPrompt');
const addQuery = require('./queries/addQueries');
const getQuery = require('./queries/getQueries');
const updateQuery = require('./queries/updateQueries')
const removeQuery = require('./queries/removeQueries');

// main function to initialize application
const init = () => {

    // adding new objects with necessary query functions
    const get = new getQuery;
    const add = new addQuery;
    const update = new updateQuery;
    const remove = new removeQuery;

    promptMainMenu()
    .then(({ action, ...addPrompts }) => {
        // switch case to run through all main menu options and their respective responses
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
            case 'Delete a department':
                const { departmentToDelete } = addPrompts;
                remove.department(departmentToDelete);
                break;
            case 'Delete a role':
                const { roleToDelete } = addPrompts;
                remove.role(roleToDelete);
                break;
            case 'Delete an employee':
                const { employeeToDelete } = addPrompts;
                remove.employee(employeeToDelete);
                break;          
            default: 
                console.log('No selection');
        }
    })
    .then(() => {
        // timeout to return to main menu to prevent overlap in console
        setTimeout(init, 500)
    })
};

// initalize app
init();