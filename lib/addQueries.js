const db = require('../db/connection');
const cTable = require('console.table');

// class for all sql queries to get information
class addQuery{
    department(name) {
        const sql = `INSERT INTO department (name) VALUES ('${name}')`;
        db.promise().query(sql)
        .then( ( [result] ) => {
            if(!result.affectedRows) {
                // error message if add query does not work
                console.log('Department not added! Please try again.');
                return;
            };

            console.log('Department added successfully!');
        });
    };

    role(title, salary, department) {
        // get the relevant department id from table using department name
        const sql = `SELECT id FROM department WHERE name = '${department}'`
        db.promise().query(sql)
        .then(( [result] ) => {
            // send id received from result at zero index to insert query
            const sql = `INSERT INTO role (title, salary, department_id) 
                            VALUES ('${title}', '${salary}', '${result[0].id}')`;
            db.promise().query(sql)
            .then(( [result] ) => {
                if(!result.affectedRows) {
                    // error message if add query does not work
                    console.log('Role not added! Please try again');
                    return;
                };

                console.log('Role added successfully!');
            });
        });
    };
};

module.exports = addQuery;