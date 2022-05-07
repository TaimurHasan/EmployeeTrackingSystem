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
            })
        })
    }
}

module.exports = choiceQuery;