
//======================================================================================
module.exports = function(app) {

  var Event= require('../models/event.js');

  //GET - Return all in the DB
  findAllEvents = function(req, res) {
    console.log("GET - /event");
    return Event.find(function(err, event) {
      if(!err) {
        return res.send(event);
      } else {
        res.statusCode = 500;
        console.log('Internal error(%d): %s',res.statusCode,err.message);
        return res.send({ error: 'Server error' });
      }
    });
  };

  //GET - Return with specified ID
  findById = function(req, res) {
    console.log("GET - /event/:id");
    return Event.findById(req.params.id, function(err, event) {
      if(!event) {
        res.statusCode = 404;
        return res.send({ error: 'Not found' });
      }
      if(!err) {
        
        return res.send({ status: 'OK', event:event});
        
      } else {
        res.statusCode = 500;
        console.log('Internal error(%d): %s',res.statusCode,err.message);
        return res.send({ error: 'Server error' });
      }
    });
  };


  //POST - Insert 
  addEvent = function(req, res) {
    console.log('POST - /event');
    console.log(req.body);

    var event = new Event({
      text:    req.body.text,
      status :  req.body.status, 
      user_id:    req.body.user_id,
      tag :    req.body.tag, 
      date:   req.body.date,
      location:   req.body.location,
      image: req.body.image,
      costs: req.body.costs,
      accecibility_tag: req.body.accecibility_tag,
      number_people_needed: req.body.number_people_needed
    });

    event.save(function(err) {
      if(!err) {
        console.log("event created");
        return res.send({ status: 'OK', event:event });
      } else {
        console.log(err);
        if(err.name == 'ValidationError') {
          res.statusCode = 400;
          res.send({ error: 'Validation error' });
        } else {
          res.statusCode = 500;
          res.send({ error: 'Server error' });
        }
        console.log('Internal error(%d): %s',res.statusCode,err.message);
      }
    });

    res.send(event);
  };


  //PUT - Update a register already exists
  updateEvent = function(req, res) {
    console.log("PUT - /event/:id");
    console.log(req.body);
    return Event .findById(req.params.id, function(err, event ) {
      if(!event) {
        res.statusCode = 404;
        return res.send({ error: 'Not found' });
      }

      if (req.body.text != null) event.text = req.body.text;
      if (req.body.status != null) event.status = req.body.status;
      if (req.body.user_id != null) event.user_id = req.body.user_id; 
      if (req.body.tag != null) event.tag  = req.body.tag ;
      if (req.body.date != null) event.date = req.body.date;
      if (req.body.location.lat != null) event.location.lat = req.body.location.lat;
      if (req.body.location.log != null) event.location.log = req.body.location.log;
      

      return event.save(function(err) {
        if(!err) {
          console.log('Updated');
          return res.send({ status: 'OK', event:event });
        } else {
          if(err.name == 'ValidationError') {
            res.statusCode = 400;
            res.send({ error: 'Validation error' });
          } else {
            res.statusCode = 500;
            res.send({ error: 'Server error' });
          }
          console.log('Internal error(%d): %s',res.statusCode,err.message);
        }

        res.send(event);
      });
    });
  }

  deleteEvent = function(req, res) {
    console.log("DELETE - /event/:id");
    return Event.findById(req.params.id, function(err, event) {
      if(!event) {
        res.statusCode = 404;
        return res.send({ error: 'Not found' });
      }

      return event.remove(function(err) {
        if(!err) {
          console.log('Removed event');
          return res.send({ status: 'OK' });
        } else {
          res.statusCode = 500;
          console.log('Internal error(%d): %s',res.statusCode,err.message);
          return res.send({ error: 'Server error' });
        }
      })
    });
  }


  //Link routes and functions
  app.get('/event', findAllEvents);
  app.get('/event/:id', findById);
  app.post('/event', addEvent);
  app.put('/event/:id', updateEvent);
  app.delete('/event/:id', deleteEvent);
 

}