var express = require('express');
const router = express.Router();
var control = require('./controllers/controller');

router.post('/authenticate', control.authenticate);
router.get('/getUsersById', control.getUsersById);
router.post('/addItemToMenu', control.addItemToMenu);
router.post('/getOrdersByRestaurantId', control.getOrdersByRestaurantId);
router.post('/getItemsByRestaurantId', control.getItemsByRestaurantId);
router.post('/getRestaurantById', control.getRestaurantById);
router.post('/getOrderById', control.getOrderById);
router.post('/getItemById', control.getItemById);
router.post('/getOrderItemsByOrderId', control.getOrderItemsByOrderId);
router.post('/getOrdersByUserId', control.getOrdersByUserId);
router.post('/getOrdersByOrgId', control.getOrdersByOrgId);
router.get('/getAllRestaurants', control.getAllRestaurants);
router.get('/getAllOrganisations', control.getAllOrganisations);

module.exports = router;