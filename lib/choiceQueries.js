const db = require('../db/connection');

// class for all sql queries to get information for inquirer
class choiceQuery{
    allDepartments() {
        const sql = `SELECT name FROM department`;
        // return current department table as an array of just names
        return new Promise((resolve, reject) => {
            db.query(sql, (err, result) => {
                const departmentArr = result.map(row => row.name);
                resolve(departmentArr);
            });
        });
    };

    allRoles() {
        const sql = `SELECT title FROM role`;
        // return current role table as an array of just titles
        return new Promise((resolve, reject) => {
            db.query(sql, (err, result) => {
                const roleArr = result.map(row => row.title);
                resolve(roleArr);
            });
        });
    };

    allEmployees() {
        const sql = `SELECT CONCAT(first_name, SPACE(1) ,last_name) AS manager_names FROM employee`;
        // return current employee table as an array of full names
        return new Promise((resolve, reject) => {
            db.query(sql, (err, result) => {
                const employeeArr = result.map(row => row.manager_names);
                resolve(employeeArr);
            });
        });
    };
}

const choice = new choiceQuery
choice.allEmployees();

module.exports = choiceQuery;