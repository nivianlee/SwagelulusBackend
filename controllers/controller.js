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