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

/**
 * @param {*} request 
 *  @property {string} id
 *  @property {number} amount
 * @param {*} response 
 */
const donateToOrganisation = (request, response) => {
  const id = request.body.id;
  const amount = request.body.amount;
  db.pool.query(`UPDATE organisations SET donatedAmt = donatedAmt + '${amount}' WHERE orgID = '${id}' `, [], (error, results) => {
    if (error) {
      console.log(err);
      res.status(400).end(JSON.stringify(err));
      return;
    }
    var message = "Donation successful!";
    response.status(200).end(message);
  }); 
};

const getDonationAmount = (request, response) => {

};

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
const addItemToMenu = (request, response) => {
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
const updateItem = (req, res) => {
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
const getOrdersByRestaurantId = (request, response) => {
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

/**
 * @param req.body
 *  @property {string} id
 * @param res
 *  @property {array} fooditems
 */
const getItemsByRestaurantId = (request, response) => {
  const id = request.body.id;
  db.pool.query(`SELECT * FROM fooditems WHERE resID = '${id}'`, [], (error, results) => {
    if (error) {
      console.log(err);
      res.status(400).end(JSON.stringify(err));
      return;
    }
    response.status(200).json(results);
  }); 
};

/**
 * @param req.body
 *  @property {string} id
 * @param res
 */
const getItemById = (request, response) => {
  const id = request.body.id;
  db.pool.query(`SELECT * FROM fooditems WHERE fooditemID = '${id}'`, [], (error, results) => {
    if (error) {
      console.log(err);
      res.status(400).end(JSON.stringify(err));
      return;
    }
    response.status(200).json(results);
  }); 
};

/**
 * @param req.body
 *  @property {string} id
 * @param res
 */
const getOrderItemsByOrderId = (request, response) => {
  const id = request.body.id;
  db.pool.query(`SELECT * from orderitems WHERE orderID = '${id}'`, [], (error, results) => {
    if (error) {
      console.log(err);
      res.status(400).end(JSON.stringify(err));
      return;
    }
    response.status(200).json(results);
  }); 
};

/**
 * 
 * @param {*} request 
 *  @property {string} id
 * @param {*} response 
 */
const getOrderById = (request, response) => {
  const id = request.body.id;
  db.pool.query(`SELECT * FROM orders WHERE orderID = '${id}'`, [], (error, results) => {
    if (error) {
      console.log(err);
      res.status(400).end(JSON.stringify(err));
      return;
    }
    response.status(200).json(results);
  }); 
};

/**
 * 
 * @param {*} request 
 *  @property {string} id
 * @param {*} response 
 */
const getOrdersByUserId = (request, response) => {
  const id = request.body.id;
  db.pool.query(`SELECT * FROM orders WHERE userID = '${id}'`, [], (error, results) => {
    if (error) {
      console.log(err);
      res.status(400).end(JSON.stringify(err));
      return;
    }
    response.status(200).json(results);
  }); 
};

/**
 * 
 * @param {*} request 
 *  @property {string} id
 * @param {*} response 
 */
const getOrdersByOrgId = (request, response) => {
  const id = request.body.id;
  db.pool.query(`SELECT * FROM orders WHERE orgID = '${id}'`, [], (error, results) => {
    if (error) {
      console.log(err);
      res.status(400).end(JSON.stringify(err));
      return;
    }
    response.status(200).json(results);
  }); 
};

/**
 * @param req.body
 *  @property {string} id
 * @param res
 */
const getRestaurantById = (request, response) => {
  const id = request.body.id;
  db.pool.query(`SELECT * FROM restaurants WHERE resID = '${id}'`, [], (error, results) => {
    if (error) {
      console.log(err);
      res.status(400).end(JSON.stringify(err));
      return;
    }
    response.status(200).json(results[0]);
  }); 
};

/**
 * @param req.body
 *  @property {string} id
 * @param res
 *  @property {array} restaurants
 */
const getAllRestaurants = (request, response) => {
  const id = request.body.id;
  db.pool.query(`SELECT * FROM restaurants`, [], (error, results) => {
    if (error) {
      console.log(err);
      res.status(400).end(JSON.stringify(err));
      return;
    }
    response.status(200).json(results);
  }); 
};

/**
 * @param req.body
 *  @property {string} id
 * @param res
 *  @property {string} orgID
 */
const addItemToCart = (req, res) => {
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
const placeOrder = (request, response) => {

};

/*
Donor methods
*/
const getAllOrganisations = (request, response) => {
  const id = request.body.id;
  db.pool.query(`SELECT * FROM organisations`, [], (error, results) => {
    if (error) {
      console.log(err);
      res.status(400).end(JSON.stringify(err));
      return;
    }
    response.status(200).json(results);
  }); 
};

const getOrganisationById = (request, response) => {
  const id = request.body.id;
  db.pool.query(`SELECT * FROM organisations WHERE orgID = '${id}'`, [], (error, results) => {
    if (error) {
      console.log(err);
      res.status(400).end(JSON.stringify(err));
      return;
    }
    response.status(200).json(results[0]);
  }); 
};

const getUserById = (request, response) => {
  const id = request.body.id;
  db.pool.query(`SELECT * FROM users WHERE userID = '${id}'`, [], (error, results) => {
    if (error) {
      console.log(err);
      res.status(400).end(JSON.stringify(err));
      return;
    }
    response.status(200).json(results[0]);
  }); 
};

module.exports = {
  authenticate,
  donateToOrganisation,
  getDonationAmount,
  addItemToCart,
  getOrgIdFromUserId,
  placeOrder,
  addItemToMenu,
  updateItem,
  deleteItem,
  getRestaurantById,
  getAllRestaurants,
  getItemById,
  getItemsByRestaurantId,
  getOrderItemsByOrderId,
  getOrderById,
  getOrdersByOrgId,
  getOrdersByUserId,
  getOrdersByRestaurantId,
  getAllOrganisations,
  getOrganisationById,
  getUserById
};
