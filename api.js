var control = require('./controllers/controller');

app.get("/insert", control.testGetMethod);

app.get("/login", control.authenticate);