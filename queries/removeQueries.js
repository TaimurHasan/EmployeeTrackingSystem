const db = require('../db/connection');

// class for all sql queries to delete information
class removeQuery{
    department(name) {
        // delete the department from the sql table
        const sql = `DELETE FROM department WHERE name = '${name}'`
        db.promise().query(sql)
        .then(( [result] ) => {
            if(!result.affectedRows) {
                console.log('No department was deleted!');
                return;
            };

            console.log(`The ${name} department was successfully deleted!`);
        })
        .catch(err => {
            console.log(err);
        });
    };

    role(name) {
        // delete the role from the sql table
        const sql = `DELETE FROM role WHERE title = '${name}'`
        db.promise().query(sql)
        .then(( [result] ) => {
            if(!result.affectedRows) {
                console.log('No role was deleted!');
                return;
            };

            console.log(`The ${name} role was successfully deleted!`);
        })
        .catch(err => {
            console.log(err);
        });
    };

    employee(name) {
        // delete the employee from the sql table
        const sql = `DELETE FROM employee WHERE CONCAT(first_name, SPACE(1), last_name) = '${name}'`
        db.promise().query(sql)
        .then(( [result] ) => {
            if(!result.affectedRows) {
                console.log('No employee was deleted!');
                return;
            };

            console.log(`The ${name} employee was successfully deleted!`);
        })
        .catch(err => {
            console.log(err);
        });
    };
};

module.exports = removeQuery;