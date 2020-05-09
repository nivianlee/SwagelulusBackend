var express = require('express');
const router = express.Router();
var control = require('./controllers/controller');

router.post('/login', control.authenticate);
router.get('/users', control.getUsers);
router.post('/additem', control.addItem);
router.post('/orders', control.getOrders);

module.exports = router;
