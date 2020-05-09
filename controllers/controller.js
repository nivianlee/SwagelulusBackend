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
      response.status(200).json({ type: 'res', isValid: true, id: results[0].resID });
    } else {
      db.pool.query(`SELECT * FROM users WHERE userID = '${id}'`, [], (error, results) => {
        if (error) {
          throw error;
        }
        if (results[0]) {
          response.status(200).json({ type: 'hcw', isValid: true, id: results[0].orgID });
          console.log('id = user');
        } else {
          console.log('id does not belong to restaurant or user');
          response.status(200).json({ isValid: false });
        }
      });
    }
  });
};

/**
 * @param {*} request
 *  @property {string} orgID
 *  @property {number} amount
 * @param {*} response
 */
const updateDonatedAmount = (request, response) => {
  const orgID = request.body.orgID;
  const amount = request.body.amount;
  db.pool.query(
    `UPDATE organisations SET donatedAmt = donatedAmt + '${amount}' WHERE orgID = '${orgID}' `,
    [],
    (error, results) => {
      if (error) {
        console.log(error);
        response.status(400).end(JSON.stringify(error));
        return;
      }
      var message = 'Donation successful!';
      response.status(200).end(message);
    }
  );
};

/**
 * @param {*} request
 *  @property {string} orgID
 * @param {number} response (the amount of monies)
 */
const getDonatedAmount = (request, response) => {
  const orgID = request.body.orgID;
  db.pool.query(`SELECT donatedAmt FROM organisations WHERE orgID = '${orgID}' `, [], (error, results) => {
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
 *  @property {string} name
 *  @property {string} description
 *  @property {string} image
 *  @property {number} price
 *  @property {string} resID
 * @param res
 *  @property {boolean} success
 */
const addItemToMenu = (request, response) => {
  const name = request.body.name;
  const desc = request.body.description;
  const image = request.body.image;
  const price = request.body.price;
  const resID = request.body.resID;
  db.pool.query(`SELECT * FROM restaurants WHERE resID = '${resID}'`, [], (error, results) => {
    if (error) {
      console.log(err);
      res.status(400).end(JSON.stringify(err));
      return;
    }
    if (results[0]) {
      db.pool.query(
        `INSERT INTO fooditems (name, description, image, price, resID) \n VALUES ('${name}','${desc}','${image}','${price}','${id}')`,
        [],
        (error, results) => {
          if (error) {
            console.log(err);
            res.status(400).end(JSON.stringify(err));
            return;
          }
          var message = 'Item successfully added.';
          response.status(200).end(JSON.stringify(message));
          console.log(message);
        }
      );
    } else {
      var message = 'Sorry you do not own a restaurant.';
      console.log(message);
      response.status(200).end(JSON.stringify(message));
    }
  });
};

/**
 * @param req.body
 *  @property {string} resID
 * @param res
 *  @property {array} orders
 */
// resID ==> all foodIDs ==> go through each orderItem for each foodID we check orders
const getOrdersByRestaurantId = (request, response) => {
  const resID = request.body.resID;
  db.pool.query(
    `SELECT * FROM orders 
    WHERE orderID IN 
      (SELECT orderID FROM orderitems WHERE foodItemID IN 
        (SELECT foodItemID FROM fooditems WHERE resID = '${resID}'))
    AND deliveredAt IS NULL`,
    [],
    (error, results) => {
      if (error) {
        console.log(err);
        res.status(400).end(JSON.stringify(err));
        return;
      }
      response.status(200).json(results);
    }
  );
};

/**
 * @param req.body
 *  @property {string} resID
 * @param res
 *  @property {array} fooditems
 */
const getItemsByRestaurantId = (request, response) => {
  const resID = request.body.resID;
  db.pool.query(`SELECT * FROM fooditems WHERE resID = '${resID}'`, [], (error, results) => {
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
 *  @property {string} foodItemID
 * @param res
 */
const getItemById = (request, response) => {
  const foodItemID = request.body.foodItemID;
  db.pool.query(`SELECT * FROM fooditems WHERE foodItemID = '${foodItemID}'`, [], (error, results) => {
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
 *  @property {string} orderID
 * @param res
 */
const getOrderItemsByOrderId = (request, response) => {
  const orderID = request.body.orderID;
  db.pool.query(`SELECT * from orderitems WHERE orderID = '${orderID}'`, [], (error, results) => {
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
 *  @property {string} orderID
 * @param {*} response
 */
const getOrderById = (request, response) => {
  const orderID = request.body.orderID;
  db.pool.query(`SELECT * FROM orders WHERE orderID = '${orderID}'`, [], (error, results) => {
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
 *  @property {string} userID
 * @param {*} response
 */
const getOrdersByUserId = (request, response) => {
  const userID = request.body.userID;
  db.pool.query(`SELECT * FROM orders WHERE userID = '${userID}'`, [], (error, results) => {
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
 *  @property {string} orgID
 * @param {*} response
 */
const getOrdersByOrgId = (request, response) => {
  const orgID = request.body.orgID;
  db.pool.query(`SELECT * FROM orders WHERE orgID = '${orgID}'`, [], (error, results) => {
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
 *  @property {string} resID
 * @param res
 */
const getRestaurantById = (request, response) => {
  const resID = request.body.resID;
  db.pool.query(`SELECT * FROM restaurants WHERE resID = '${resID}'`, [], (error, results) => {
    if (error) {
      console.log(err);
      res.status(400).end(JSON.stringify(err));
      return;
    }
    if (results[0]) {
      response.status(200).json(results[0]);
    } else {
      var message = 'Sorry you do not own a restaurant.';
      console.log(message);
      response.status(200).end(JSON.stringify(message));
    }
  });
};

/**
 * @param res
 *  @property {array} restaurants
 */
const getAllRestaurants = (request, response) => {
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
 *
 * @param {*} request
 *  @property {array} fooditems (object of foodItemID : quantity)
 *  @property {string} orderedAt
 *  @property {string} userID
 * @param {*} response
 */
const placeOrder = (request, response) => {
  const fooditems = request.body.fooditems;
  const orderedAt = request.body.orderedAt;
  const userID = request.body.userID;
  db.pool.query(`SELECT orgID FROM users WHERE userID = '${userID}'`, [], (error, results) => {
    if (error) {
      console.log(err);
      res.status(400).end(JSON.stringify(err));
      return;
    }
    if (results) {
      const orgID = results[0].orgID;
      db.pool.query(
        `INSERT INTO orders (orderedAt, deliveredAt, orgID, userID)
        VALUES ('${orderedAt}', NULL, ${orgID}, '${userID}')`,
        [],
        (error, results) => {
          if (error) {
            console.log(error);
            response.status(400).end(JSON.stringify(error));
            return;
          }
          if (results) {
            const orderID = results.insertId;
            fooditems.forEach((element) => {
              db.pool.query(`INSERT INTO orderitems (quantity, orderID, foodItemID)
            VALUES (${element.quantity}, '${orderID}', '${element.foodItemID}')`);
            });
            response.status(200).end('Order successfully placed!');
          } else {
            response.status(200).end('');
          }
        }
      );
    } else {
      response.status(200).end('');
    }
  });
};

/*
Donor methods
*/
const getAllOrganisations = (request, response) => {
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
  const orgID = request.body.orgID;
  db.pool.query(`SELECT * FROM organisations WHERE orgID = '${orgID}'`, [], (error, results) => {
    if (error) {
      console.log(err);
      res.status(400).end(JSON.stringify(err));
      return;
    }
    response.status(200).json(results[0]);
  });
};

const getUserById = (request, response) => {
  const userID = request.body.userID;
  db.pool.query(`SELECT * FROM users WHERE userID = '${userID}'`, [], (error, results) => {
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
  getDonatedAmount,
  updateDonatedAmount,
  placeOrder,
  addItemToMenu,
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
  getUserById,
};
