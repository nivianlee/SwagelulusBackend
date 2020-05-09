var express = require('express');
const router = express.Router();
var control = require('./controllers/controller');

router.post('/login', control.authenticate);
router.get('/users', control.getUsersById);
router.post('/additem', control.addItemToMenu);
router.post('/orders', control.getOrdersByRestaurantId);
router.post('/items', control.getItemsByRestaurantId);
router.post('/getRestaurantById', control.getRestaurantById);

module.exports = router;
