
//======================================================================================
module.exports = function(app) {

  var Activity= require('../models/activity.js');

  //GET - Return all in the DB
  findAllActivitys = function(req, res) {
    console.log("GET - /activity");
    return Activity.find(function(err, activity) {
      if(!err) {
        return res.send(activity);
      } else {
        res.statusCode = 500;
        console.log('Internal error(%d): %s',res.statusCode,err.message);
        return res.send({ error: 'Server error' });
      }
    });
  };

  //GET - Return with specified ID
  findById = function(req, res) {
    console.log("GET - /activity/:id");
    return Activity.findById(req.params.id, function(err, activity) {
      if(!Activity) {
        res.statusCode = 404;
        return res.send({ error: 'Not found' });
      }
      if(!err) {
        
        return res.send({ status: 'OK', activity:activity});
        
      } else {
        res.statusCode = 500;
        console.log('Internal error(%d): %s',res.statusCode,err.message);
        return res.send({ error: 'Server error' });
      }
    });
  };


  //POST - Insert 
  addActivity = function(req, res) {
    console.log('POST - /activity');
    console.log(req.body);

    var Activity = new activity({
      text:    req.body.text,
      status :  req.body.status, 
      user_id:    req.body.user_id,
      tag :    req.body.tag, 
      date:   req.body.date
    });

    Activity.save(function(err) {
      if(!err) {
        console.log("activity created");
        return res.send({ status: 'OK', Activity:Activity });
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

    res.send(Activity);
  };


  //PUT - Update a register already exists
  updateActivity = function(req, res) {
    console.log("PUT - /activity/:id");
    console.log(req.body);
    return Activity .findById(req.params.id, function(err, Activity ) {
      if(!otification) {
        res.statusCode = 404;
        return res.send({ error: 'Not found' });
      }

      if (req.body.text != null) activity.text = req.body.text;
      if (req.body.status != null) activity.status = req.body.status;
      if (req.body.user_id != null) activity.user_id = req.body.user_id; 
      if (req.body.tag != null) activity.tag  = req.body.tag ;
      if (req.body.date != null) activity.date = req.body.date;
      

      return Activity.save(function(err) {
        if(!err) {
          console.log('Updated');
          return res.send({ status: 'OK', activity:activity });
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

        res.send(Activity);
      });
    });
  }

  deleteActivity = function(req, res) {
    console.log("DELETE - /Activity/:id");
    return Activity.findById(req.params.id, function(err, activity) {
      if(!activity) {
        res.statusCode = 404;
        return res.send({ error: 'Not found' });
      }

      return Activity.remove(function(err) {
        if(!err) {
          console.log('Removed activity');
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
  app.get('/activity', findAllActivitys);
  app.get('/activity/:id', findById);
  app.post('/activity', addActivity);
  app.put('/activity/:id', updateActivity);
  app.delete('/activity/:id', deleteActivity);
 

}