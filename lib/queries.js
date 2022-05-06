const db = require('../db/connection');
const cTable = require('console.table');

class orgQuery{
    getAllDepartments() {
        const sql = `SELECT * FROM department`; 
        db.query(sql, (err, rows) => {
            if(err) {
                console.log(err);
                return;
            };

            console.table('Departments', rows);
        });
    };

    getAllRoles() {
        const sql = `SELECT role.title, role.id AS role_id, department.name AS department_name, role.salary
                        FROM role
                        LEFT JOIN department
                        ON role.department_id = department.id;                
        `
        db.query(sql, (err, rows) => {
            if(err) {
                console.log(err);
                return;
            }

            console.table('Roles', rows);
        });
    };


}

module.exports = orgQuery;