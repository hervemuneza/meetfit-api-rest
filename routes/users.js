
//======================================================================================
module.exports = function(app) {

  var User= require('../models/user.js');

  //GET - Return all from DB
  findAllUsers = function(req, res) {
    console.log("GET - /User");
    return User.find(function(err, user) {
      if(!err) {
        return res.send(user);
      } else {
        res.statusCode = 500;
        console.log('Internal error(%d): %s',res.statusCode,err.message);
        return res.send({ error: 'Server error' });
      }
    });
  };

  //GET - Return  with specified ID
  findById = function(req, res) {
    console.log("GET - /user/:id");
    return User.findById(req.params.id, function(err, user) {
      if(!user) {
        res.statusCode = 404;
        return res.send({ error: 'Not found' });
      }
      if(!err) {
        
        return res.send({ status: 'OK', user:user});
    
      } else {
        res.statusCode = 500;
        console.log('Internal error(%d): %s',res.statusCode,err.message);
        return res.send({ error: 'Server error' });
      }
    });
  };


  //POST - Insert 
  addUser = function(req, res) {
    console.log('POST - /User');
    console.log(req.body);

    var user = new User({
      name:    req.body.name,
      gender :  req.body.gender, 
      age:    req.body.age,
      role :    req.body.role, 
      location_lat:   req.body.location_lat,
      location_long:   req.body.location_long,
      location_name:   req.body.location_name
    });

    user.save(function(err) {
      if(!err) {
        console.log("user created");
        return res.send({ status: 'OK', user:user });
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

    res.send(user);
  };


  //PUT - Update a register already exists
  updateUser = function(req, res) {
    console.log("PUT - /user/:id");
    console.log(req.body);
    return User.findById(req.params.id, function(err, user ) {
      if(!user) {
        res.statusCode = 404;
        return res.send({ error: 'Not found' });
      }

      if (req.body.name != null) user.name = req.body.name;
      if (req.body.gender != null) user.gender = req.body.gender;
      if (req.body.age != null) user.age = req.body.age; 
      if (req.body.role != null) user.age = req.body.role; 
      if (req.body.location_lat != null) user.location_lat  = req.body.location_lat ;
      if (req.body.location_long != null) user.location_long  = req.body.location_long ;
     if (req.body.location_name != null) user.location_name  = req.body.location_name ;
      

      return user.save(function(err) {
        if(!err) {
          console.log('Updated');
          return res.send({ status: 'OK', user:user });
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

        res.send(user);
      });
    });
  }

//Delete
  deleteUser = function(req, res) {
    console.log("DELETE - /user/:id");
    return User.findById(req.params.id, function(err, user) {
      if(!user) {
        res.statusCode = 404;
        return res.send({ error: 'Not found' });
      }

      return user.remove(function(err) {
        if(!err) {
          console.log('Removed user');
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
  app.get('/user', findAllUsers);
  app.get('/user/:id', findById);
  app.post('/user', addUser);
  app.put('/user/:id', updateUser);
  app.delete('/user/:id', deleteUser);
 

}