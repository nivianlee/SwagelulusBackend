var express = require('express');
const router = express.Router();
var control = require('./controllers/controller');

//router.get('/boon/:userid/:', control.boon);

router.post('/authenticate', control.authenticate);
router.post('/getUserById', control.getUserById);
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
router.post('/getOrganisationById', control.getOrganisationById);
router.get('/getAllOrganisations', control.getAllOrganisations);
router.post('/updateDonatedAmount', control.updateDonatedAmount);
router.post('/getDonatedAmount', control.getDonatedAmount);
router.post('/placeOrder', control.placeOrder);


module.exports = router;