var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Room = require('../models/Room');


function needAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    req.flash('danger', '로그인이 필요합니다.');
    res.redirect('/');
  }
}

router.get('/', function(req, res, next) {
  Room.find({},function(err,rooms){
    res.render('posts',{rooms:rooms});
  });
});

router.post('/',needAuth, function(req, res, next) {
  Room.find({city:req.body.position},function(err,rooms){
    res.render('posts',{rooms:rooms});
  });
});


/*router.post('/', function(req, res, next) {
  res.render('posts');
});*/

module.exports = router;
