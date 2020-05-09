var db = require('../db/db');

/**
 * @param req.body
 *  @property {string} id
 * @param res
 *  @property {string} type (hcw, res)
 *  @property {boolean} isValid
 *  @property {string} id (orgID, userID)
 */

const authenticate = (request, response) => {
  const id = request.body.id;
  db.pool.query(`SELECT * FROM restaurants WHERE resID = '${id}'`, [], (error, results) => {
    if (error) {
      throw error;
    }
    if (results[0]) {
      response.status(200).json(results[0]);
    } else {
      db.pool.query(`SELECT * FROM users WHERE userID = '${id}'`, [], (error, results) => {
        if (error) {
          throw error;
        }
        if (results[0]) {
          response.status(200).json(results[0]);
          console.log('id = user');
        } else {
          console.log('id does not belong to restaurant or user');
        }
      });
    }
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

    var query = 'SELECT * FROM users';
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

    var query = 'SELECT * FROM users';
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

    var query = 'SELECT * FROM users';
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

    var query = 'SELECT * FROM users';
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

    var query = 'SELECT * FROM users';
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

    var query = 'SELECT * FROM users';
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

    var query = 'SELECT * FROM users';
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

    var query = 'SELECT * FROM users';
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

const getUsers = (request, response) => {
  const id = request.body.id;
  db.pool.query(`SELECT * FROM users`, [], (error, results) => {
    if (error) {
      throw error;
    }
    if (results) {
      response.status(200).json(results);
    }
  });
};

module.exports = {
  authenticate,
  addItem,
  editItem,
  deleteItem,
  getOrder,
  viewItems,
  orderItem,
  viewOrganisations,
  selectOrganisation,
  getUsers,
};
