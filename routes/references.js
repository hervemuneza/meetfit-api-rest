
//======================================================================================
module.exports = function(app) {

  var Reference= require('../models/reference.js');

  //GET - Return all in the DB
  findAllReferences = function(req, res) {
    console.log("GET - /Reference");
    return Reference.find(function(err, reference) {
      if(!err) {
        return res.send(reference);
      } else {
        res.statusCode = 500;
        console.log('Internal error(%d): %s',res.statusCode,err.message);
        return res.send({ error: 'Server error' });
      }
    });
  };

  //GET - Return with specified ID
  findById = function(req, res) {
    console.log("GET - /reference/:id");
    return Reference.findById(req.params.id, function(err, reference) {
      if(!reference) {
        res.statusCode = 404;
        return res.send({ error: 'Not found' });
      }
      if(!err) {
        
        return res.send({ status: 'OK', reference:reference});
        
      } else {
        res.statusCode = 500;
        console.log('Internal error(%d): %s',res.statusCode,err.message);
        return res.send({ error: 'Server error' });
      }
    });
  };


  //POST - Insert 
  addReference = function(req, res) {
    console.log('POST - /reference');
    console.log(req.body);

    var reference = new Reference({
      text:    req.body.text,
      status :  req.body.status, 
      user_id:    req.body.user_id,
      tag :    req.body.tag, 
      date:   req.body.date
    });

    Reference.save(function(err) {
      if(!err) {
        console.log("Reference created");
        return res.send({ status: 'OK', reference:reference });
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

    res.send(Reference);
  };


  //PUT - Update a register already exists
  updateReference = function(req, res) {
    console.log("PUT - /Reference/:id");
    console.log(req.body);
    return Reference .findById(req.params.id, function(err, reference ) {
      if(!otification) {
        res.statusCode = 404;
        return res.send({ error: 'Not found' });
      }

      if (req.body.text != null) reference.text = req.body.text;
      if (req.body.status != null) reference.status = req.body.status;
      if (req.body.user_id != null) reference.user_id = req.body.user_id; 
      if (req.body.tag != null) reference.tag  = req.body.tag ;
      if (req.body.date != null) reference.date = req.body.date;
      

      return Reference.save(function(err) {
        if(!err) {
          console.log('Updated');
          return res.send({ status: 'OK', reference:reference });
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

        res.send(Reference);
      });
    });
  }

  deleteReference = function(req, res) {
    console.log("DELETE - /Reference/:id");
    return Reference.findById(req.params.id, function(err, reference) {
      if(!reference) {
        res.statusCode = 404;
        return res.send({ error: 'Not found' });
      }

      return Reference.remove(function(err) {
        if(!err) {
          console.log('Removed Reference');
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
  app.get('/reference', findAllReferences);
  app.get('/reference/:id', findById);
  app.post('/reference', addReference);
  app.put('/reference/:id', updateReference);
  app.delete('/reference/:id', deleteReference);
 

}