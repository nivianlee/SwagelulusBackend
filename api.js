var express = require("express");
const router = express.Router();
var control = require('./controllers/controller');

router.get("/insert", control.testGetMethod);
router.post("/login", control.authenticate);

module.exports = router;