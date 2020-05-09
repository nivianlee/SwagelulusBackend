var express = require('express');
const router = express.Router();
var control = require('./controllers/controller');

<<<<<<< HEAD
router.post('/login', control.authenticate);
router.get('/users', control.getUsers);
router.post('/additem', control.addItem);
router.post('/orders', control.getOrders);
router.get('/orgid/:userid', control.getOrgIdFromUserId);
=======
router.post('/authenticate', control.authenticate);
router.get('/getUsersById', control.getUsersById);
router.post('/addItemToMenu', control.addItemToMenu);
router.post('/getOrdersByRestaurantId', control.getOrdersByRestaurantId);
router.post('/getItemsByRestaurantId', control.getItemsByRestaurantId);
router.post('/getRestaurantById', control.getRestaurantById);
router.post('/getOrderById', control.getOrderById);
>>>>>>> 1bdc28ddbdfc31afb20a5c46c0acf4a92071c616

module.exports = router;
