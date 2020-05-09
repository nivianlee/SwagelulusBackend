var express = require('express');
const router = express.Router();
var control = require('./controllers/controller');

router.post('/login', control.authenticate);
router.get('/users', control.getUsers);

module.exports = router;
