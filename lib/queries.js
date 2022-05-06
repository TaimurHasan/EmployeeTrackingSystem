const db = require('../db/connection');
const cTable = require('console.table');

class orgQuery{
    getAllDepartments() {
        db.query(`SELECT * FROM department`, (err, rows) => {
            console.table(rows);
        })
    }
}

module.exports = orgQuery;