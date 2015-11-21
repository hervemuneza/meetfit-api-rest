// Incluímos las dependencias que vamos a usar
var express = require("express"),
    app     = express(),
    http    = require("http"),
    server  = http.createServer(app),
    mongoose = require("mongoose");


app.configure(function () {
  app.use(express.bodyParser()); // JSON parsing
  app.use(express.methodOverride()); // HTTP PUT and DELETE support
  app.use(app.router); // simple route management
});

notifications = require('./routes/notifications')(app);
user = require('./routes/users')(app);
events = user = require('./routes/events')(app);

// Conexión
mongoose.connect('mongodb://localhost/notification', function(err, res) {
  if(err) {
    console.log('ERROR: connecting to Database. ' + err);
  } else {
    console.log('Connected to Database');
  }
});


app.get('/', function(req, res) {
  res.send("MeetFit!");
});

// El servidor escucha en el puerto 3000
server.listen(3000, function() {
  console.log("Node server running on http://localhost:3000");
});