const express = require("express");
const router = express.Router();
const drivers = require('../drivers');

router.get('/get-Irrigation-select', (req, res) => {
    let query = `SELECT * FROM Irrigation_DB.Persons;`;
    drivers.promSqlRunner(query).then((result) => {
      res.status(200).json(drivers.promGetResJson(200, 'Person in Table', result));
    }).catch(err => {
      res.status(400).json(drivers.promGetResJson(400, 'Error While getting entry in Table', err));
      console.log(err);
    });
  })


  router.post('/post-Irrigation-data', (req, res) => {
    console.log(req.query);  
  
    let query = `INSERT INTO Irrigation_DB.Persons SET
    PersonID=12,
    LastName='${req.query.ln}',
    FirstName='',
    Address='',
    City='';`;
    drivers.promSqlRunner(query).then((result) => {
      res.status(200).json(drivers.promGetResJson(200, 'Inserted Person in Table', result));
    }).catch(err => {
      res.status(400).json(drivers.promGetResJson(400, 'Error While Inserting Person in Table', err));
    });
  })

  module.exports = router;