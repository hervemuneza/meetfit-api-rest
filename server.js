
var express = require("express"),
    app     = express(),
    http    = require("http"),
    server  = http.createServer(app),
    mongoose = require("mongoose");


app.configure(function () {
  app.use(express.bodyParser()); 
  app.use(express.methodOverride()); 
  app.use(app.router); 
});

notifications = require('./routes/notifications')(app);
user = require('./routes/users')(app);
events = require('./routes/events')(app);
reference = require('./routes/references')(app);
activity =events = require('./routes/activities')(app);

// Conexión
mongoose.connect('mongodb://localhost/event', function(err, res) {
  if(err) {
    console.log('ERROR: connecting to Database. ' + err);
  } else {
    console.log('Connected to Database');
  }
});


app.get('/', function(req, res) {
  res.send("MeetFit!");
});


server.listen(3000, function() {
  console.log("Node server running on http://localhost:3000");
});