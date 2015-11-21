
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
      name_event:    req.body.name_event,
      user_id:    req.body.user_id,
      date:   req.body.date,
      location_lat:   req.body.location_lat,
      location_long:   req.body.location_long,
      image_url: req.body.image_url,
      costs: req.body.costs,
      accecibility_tag: req.body.accecibility_tag,
      extra_info : req.body.extra_info,
      number_people_needed: req.body.number_people_needed,
      number_people_in_event: req.body.number_people_in_event 
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

//


  //PUT - Update a register already exists
  updateEvent = function(req, res) {
    console.log("PUT - /event/:id");
    console.log(req.body);
    return Event .findById(req.params.id, function(err, event ) {
      if(!event) {
        res.statusCode = 404;
        return res.send({ error: 'Not found' });
      }

      if (req.body.name_event != null) event.name_event = req.body.name_event;
      if (req.body.costs != null) event.costs = req.body.costs;
      if (req.body.user_id != null) event.user_id = req.body.user_id; 
      if (req.body.accecibility_tag != null) event.accecibility_tag  = req.body.accecibility_tag ;
      if (req.body.date != null) event.date = req.body.date;
      if (req.body.image_url != null) event.image_url = req.body.image_url;
      if (req.body.number_people_needed != null) event.number_people_needed = req.body.number_people_needed;
      if (req.body.extra_info != null) event.extra_info = req.body.extra_info;
      if (req.body.location_lat != null) event.location_lat= req.body.location_lat;
      if (req.body.location_long != null) event.location_long= req.body.location_long;
      if (req.body.number_people_in_event != null) event.number_people_in_event= req.body.number_people_in_event;

      
      

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