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

/**
 * @param req.body
 *  @property {string} nric
 * @param res
 *  @property {string} type (hcw, res)
 *  @property {boolean} isValid
 *  @property {string} id (orgID, nric)
 */
const authenticate = (req, res) => {
  db.pool.getConnection((err, connection) => {
    if (err) { 
      console.log(err);
      res.status(400).end(JSON.stringify(err));
      return;
    } 
    var query = "SELECT * FROM restaurants WHERE resID = " + req.body.nric;
    connection.query(query, [], (err, result) => {
      connection.release();
      if (err) {
        console.log(err);
        res.status(400).end(JSON.stringify(err));
        return; 
      }
      if (result) {
        var found = result[0];
        console.log(found);
        res.end(JSON.stringify(result));
        return;
      }
    });
    return;
    query = "SELECT * FROM users WHERE userID = " + req.body.nric;
    connection.query(query, [], (err, result) => {
      connection.release();
      if (err) {
        console.log(err);
        res.status(400).end(JSON.stringify(err));
        return; 
      }
      if (result) {
        res.end(JSON.stringify(result));
        return;
      }
    });
    res.end({isValid: false});
  });
};

/*
For all the restaurant owners
*/
const addItem = (req, res) => {
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

const editItem = (req, res) => {
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

const deleteItem = (req, res) => {
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

const getOrder = (req, res) => {
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

/*
HCW user methods
*/
const viewItems = (req, res) => {
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

const orderItem = (req, res) => {
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

/*
Donator methods
*/
const viewOrganisations = (req, res) => {
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

const selectOrganisation = (req, res) => {
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
  testGetMethod,
  authenticate,
  addItem,
  editItem,
  deleteItem,
  getOrder,
  viewItems,
  orderItem,
  viewOrganisations,
  selectOrganisation
};
