const config = require("./config.json");
const mysql = require("mysql");

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "@Technology1"
  });

//   pool.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//   });

// ---------------- Driver Functions ------------------

/**
 * Use this function to run SQL queries
 * @param {*} queryStr Sql Query to run
 * @returns Promise
 */
const promSqlRunner = function (queryStr) {

    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) reject(err);
            connection.query(queryStr, function (error, results, fields) {
                connection.release();
                if (error) reject(error);
                else resolve(results)
            });
        });
    });
}

/**
 *
 * @param {number} code Code to take action accordingly [200/400/404]
 * @param {string} msg Msg to put in return object
 * @param {*} result Misc
 * @returns JSON object in format - {success: bool, meta: *, message: string}
 */
const promGetResJson = function (code, msg, result = null) {
    if (code == 200)
        return { success: true, meta: result, message: msg };
    else if (code == 400 || code == 404)
        return { success: false, meta: result, message: msg };
}

module.exports = { promSqlRunner, promGetResJson }