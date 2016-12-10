var express = require('express');
var router = express.Router();
var Room = require('../models/Room');
var User = require('../models/User');
var Comment = require('../models/Comment');
var _ = require('lodash');
var countries = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Central African Republic", "Chad", "Chile", "China", "Colombi", "Comoros", "Congo (Brazzaville)", "Congo", "Costa Rica", "Cote d'Ivoire", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor (Timor Timur)", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia, The", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepa", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia and Montenegro", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "Spain", "Sri Lanka", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
 ];

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
  Room.findById(req.params.id,function(err,room){
    if(err){
        return next(err);
    }
    room.reservation=true;
    room.guest=req.user;
    room.guestName=req.user.name;
    room.save(function(err){
      if(err){
        return next(err);
      }
      res.render('index');
    });
  });
 
});
router.get('/signout/:id', function(req, res, next) {
  req.logout();
  res.render('index',{currentUser:null});
});
router.get('/profile/:id', function(req, res, next) {
  User.findById(req.params.id, function(err, user) {
    if (err) {
      return next(err);
    }
    res.render('users/show', {user: user});
  });
});
router.get('/room_list/:id',function(req,res,next){
  Room.find({user:req.params.id},function(err,rooms) {
    res.render('room_list',{rooms:rooms});
  });
});

router.get('/suggest', function(req, res, next) {
  var position = req.query.position;
  var ret = _.filter(countries, function(name) {
    return name.toLowerCase().indexOf(position.toLowerCase()) > -1;
  });
  // JSON으로 결과를 return
  res.json(ret);
});

router.get('/permition/:id', function(req, res, next) {
  Room.findById(req.params.id,function(err,room){
    if(err){
        return next(err);
    }
    room.permission=true;
    room.save(function(err){
      if(err){
        return next(err);
      }
       res.redirect('back');
    });
  
  });
});
router.get('/deny/:id', function(req, res, next) {
  Room.findById(req.params.id,function(err,room){
    if(err){
        return next(err);
    }
    room.reservation=false;
    room.permission=false;
    room.save(function(err){
      if(err){
        return next(err);
      }
       res.redirect('back');
    });
  });
});

module.exports = router;
