var db = require('../db/db');

const testGetMethod = (req, res, next) => {
  console.log("testGetMethod run");
  db.pool.getConnection((err, connection) => {
    if (err) { 
      console.log(err);
      res.status(400).end(JSON.stringify(err));
      return;
    }

    var query = "SELECT * FROM users";
    connection.query(query, [], (err, result) => {
      connection.release();
      if (err) {
        console.log(err);
        res.status(400).end(JSON.stringify(err));
        return; 
      }
      res.end(JSON.stringify(result));
    });
  });
};

module.exports = {
  testGetMethod
};

const authenticate = (req, res) => {

};

/*
For all the restaurant owners
*/
const addItem = (req, res) => {

};

const editItem = (req, res) => {

};

const deleteItem = (req, res) => {

};

const getOrder = (req, res) => {

};

/*
HCW user methods
*/
const viewItems = (req, res) => {

};

const orderItem = (req, res) => {

};

/*
Donator methods
*/
const viewOrganisations = (req, res) => {

};

const selectOrganisation = (req, res) => {

};