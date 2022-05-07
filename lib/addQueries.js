const db = require('../db/connection');
const cTable = require('console.table');

// class for all sql queries to get information
class addQuery{
    department(name) {
        console.log(name);
        const sql = `INSERT INTO department (name) VALUES ('${name}')`;
        db.promise().query(sql)
        .then( ( [result] ) => {
            if(!result.affectedRows) {
                // error message if add query does not work
                console.log('Department not added! Please try again.');
                return;
            };

            console.log('Department added successfully!');
        })
    }
}

module.exports = addQuery;