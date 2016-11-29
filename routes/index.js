var express = require('express');
var router = express.Router();
var Room = require('../models/Room');
var User = require('../models/User');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.get('/hosting/:id', function(req, res, next) {
  User.findById(req.params.id,function(err,user){
  if(err)
  {
    return next(err);
  }
   res.render('hosting',user); 
  });
  
});
router.get('/:id', function(req, res, next) {
  /*Room.findAndModify(req.params.id, function(err, room) {
    if (err) {
      return next(err);
    }
    room.update({id:req.params.id}, {$set:{reservation:true}});
    res.render('index');
  });*/
  /*Room.update({id:req.params.id},{$set:{reservation:true}});
  res.render('index');*/
  /*Room.findOneAndUpdate(
   { "_id": req.params.id },
   {$set:{"reservation":true}}
  );*/
  Room.findById(req.params.id,function(err,room){
    if(err){
        return next(err);
    }
    room.reservation=true;
    room.save(function(err){
      if(err){
        return next(err);
      }
      res.render('index');
    });
  });
 
});
/*router.get('/signout/:id', function(req, res, next) {
  //req.logout();
  res.render('index',{user:null});
});*/
/*router.get('/posts', function(req, res, next) {
  res.render('/posts');
});*/

module.exports = router;
