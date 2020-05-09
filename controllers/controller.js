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
      console.log(err);
      res.status(400).end(JSON.stringify(err));
      return;
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
          response.status(200).json({ valid: false })
        }
      });
    }
  });
};

/*
For all the restaurant owners
*/

/**
 * @param req.body
 *  @property {string} name
 *  @property {string} description
 *  @property {string} image
 *  @property {number} price
 *  @property {string} id
 * @param res
 *  @property {boolean} success
 */
const addItem = (request, response) => {
  const name = request.body.name;
  const desc = request.body.description;
  const image = request.body.image;
  const price = request.body.price;
  const id = request.body.id;
  db.pool.query(`SELECT * FROM restaurants WHERE resID = '${id}'`, [], (error, results) => {
    if (error) {
      console.log(err);
      res.status(400).end(JSON.stringify(err));
      return;
    } 
    if (results[0]) {
      db.pool.query(`INSERT INTO fooditems (name, description, image, price, resID) \n VALUES ('${name}','${desc}','${image}','${price}','${id}')`, [], (error, results) => {
        if (error) {
          console.log(err);
          res.status(400).end(JSON.stringify(err));
          return;
        }
        var message = "Item successfully added.";
        response.status(200).end(JSON.stringify(message));
        console.log(message);
      });
    } else {
      var message = "Sorry you do not own a restaurant.";
      console.log(message);
      response.status(200).end(JSON.stringify(message));
    }
  });
};

// maybe later mater
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

/**
 * @param req.body
 *  @property {string} id
 * @param res
 *  @property {array} orders
 */
// resID ==> all foodIDs ==> go through each orderItem for each foodID we check orders
const getOrders = (request, response) => {
  const id = request.body.id;
  db.pool.query(
    `SELECT * FROM orders 
    WHERE orderID IN 
      (SELECT orderID FROM orderitems WHERE foodItemID IN 
        (SELECT foodItemID FROM fooditems WHERE resID = '${id}'))
    AND deliveredAt IS NULL`, [], (error, results) => {
    if (error) {
      console.log(err);
      res.status(400).end(JSON.stringify(err));
      return;
    } 
    response.status(200).json(results);
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

/**
 * @param req.body
 *  @property {string} userID
 *  @property {number} foodItemID
 *  @property {number} quantity
 *  @property {string} id
 * @param res
 *  @property {boolean} success
 */
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

/**
 * @param req.body
 *  @property {string} id
 * @param res
 *  @property {string} orgID
 */
const getOrgIdFromUserId = (request, response) => {
  const id = request.params.userid;
  db.pool.getConnection((err, connection) => {
    var query = `SELECT orgID FROM users WHERE userID = '${id}'`;
    connection.query(query, [], (err, result) => {
      connection.release();
      if (err) {
        console.log(err);
        res.status(400).end(JSON.stringify(err));
        return;
      }
      response.end(JSON.stringify(result));
    });
  });
};

// orgID + userID + items in the cart ==> create a new Order object and add it to the order table ==> retrieve the Order ID of this order object
// ==> for each item in the cart we will create an orderitem with the ordeRID and fooDID
/*
Donor methods
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
  getOrders,
  viewItems,
  orderItem,
  getOrgIdFromUserId,
  viewOrganisations,
  selectOrganisation,
  getUsers,
};
