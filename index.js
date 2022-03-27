const express = require('express');
const router = express.Router();
const drivers = require('./drivers');
const bodyParser = require('body-parser');
const app = express();
app.use(express.json({ extended: false }));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});
app.get("/", (req, res) => {
    res.send("Root API Works");
});

router.get('/get-Irrigation-select', (req, res) => {
    console.log(Date)
    let query = `SELECT * FROM Irrigation_DB.Persons;`;
    drivers.promSqlRunner(query).then((result) => {
      res.status(200).header({ 'Cache-Control': 'max-age=604800' }).json(drivers.promGetResJson(200, 'Person in Table', result));
    }).catch(err => {
      res.status(400).json(drivers.promGetResJson(400, 'Error While getting entry in Table', err));
    });
  })

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
 * Use this global function to handle response
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

app.listen(3000, () => {
    console.log("server running on 3003");
});
