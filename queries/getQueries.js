const db = require('../db/connection');
const cTable = require('console.table');

// class for all sql queries to get information
class getQuery{
    allDepartments() {
        const sql = `SELECT * FROM department`; 
        db.promise().query(sql)
        .then( ( [rows, fields] ) => {
            // console log table with a line break
            console.table('\n','Departments', rows);
        })
    };

    allRoles() {
        const sql = `SELECT role.title, role.id AS role_id, department.name AS department_name, role.salary
                        FROM role
                        LEFT JOIN department
                        ON role.department_id = department.id;                
                    `
        db.promise().query(sql) 
        .then(([rows, fields]) => {
            console.table('\n','Roles', rows);
        });
    };

    allEmployees() {
        // sql query to pull information from employee and join relevant links to role and department and self-reference for manager name
        const sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title AS job_title, 
                        department.name AS department,role.salary AS salary, CONCAT(manager.first_name, SPACE(1) ,manager.last_name) AS manager_name
                        FROM employee
                        LEFT JOIN role ON employee.role_id = role.id
                        LEFT JOIN department ON role.department_id = department.id
                        LEFT JOIN employee manager ON employee.manager_id = manager.id
                        `           
        
        db.promise().query(sql)
        .then(( [rows, fields ] ) => {
            console.table('\n','Employees', rows);
        });
    };
}

module.exports = getQuery;