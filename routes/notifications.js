
//======================================================================================
module.exports = function(app) {

  var Notification= require('../models/notification.js');

  //GET - Return all in the DB
  findAllNotifications = function(req, res) {
    console.log("GET - /notification");
    return Notification.find(function(err, notification) {
      if(!err) {
        return res.send(notification);
      } else {
        res.statusCode = 500;
        console.log('Internal error(%d): %s',res.statusCode,err.message);
        return res.send({ error: 'Server error' });
      }
    });
  };

  //GET - Return with specified ID
  findById = function(req, res) {
    console.log("GET - /notification/:id");
    return Notification.findById(req.params.id, function(err, notification) {
      if(!notification) {
        res.statusCode = 404;
        return res.send({ error: 'Not found' });
      }
      if(!err) {
        
        return res.send({ status: 'OK', notification:notification});
        
      } else {
        res.statusCode = 500;
        console.log('Internal error(%d): %s',res.statusCode,err.message);
        return res.send({ error: 'Server error' });
      }
    });
  };


  //POST - Insert 
  addNotification = function(req, res) {
    console.log('POST - /notification');
    console.log(req.body);

    var notification = new Notification({
      text:    req.body.text,
      status :  req.body.status, 
      user_id:    req.body.user_id,
      tag :    req.body.tag, 
      date:   req.body.date
    });

    notification.save(function(err) {
      if(!err) {
        console.log("notification created");
        return res.send({ status: 'OK', notification:notification });
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

    res.send(notification);
  };


  //PUT - Update a register already exists
  updateNotification = function(req, res) {
    console.log("PUT - /notification/:id");
    console.log(req.body);
    return Notification .findById(req.params.id, function(err, notification ) {
      if(!otification) {
        res.statusCode = 404;
        return res.send({ error: 'Not found' });
      }

      if (req.body.text != null) notification.text = req.body.text;
      if (req.body.status != null) notification.status = req.body.status;
      if (req.body.user_id != null) notification.user_id = req.body.user_id; 
      if (req.body.tag != null) notification.tag  = req.body.tag ;
      if (req.body.date != null) notification.date = req.body.date;
      

      return notification.save(function(err) {
        if(!err) {
          console.log('Updated');
          return res.send({ status: 'OK', notification:notification });
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

        res.send(notification);
      });
    });
  }

  deleteNotification = function(req, res) {
    console.log("DELETE - /notification/:id");
    return Notification.findById(req.params.id, function(err, notification) {
      if(!notification) {
        res.statusCode = 404;
        return res.send({ error: 'Not found' });
      }

      return notification.remove(function(err) {
        if(!err) {
          console.log('Removed notification');
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
  app.get('/notification', findAllNotifications);
  app.get('/notification/:id', findById);
  app.post('/notification', addNotification);
  app.put('/notification/:id', updateNotification);
  app.delete('/notification/:id', deleteNotification);
 

}