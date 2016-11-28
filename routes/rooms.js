var express = require('express'),
    User = require('../models/User'),
    Room = require('../models/Room');
var router = express.Router();

function needAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json({message: 'Not authorized'});
  }
}

/*router.get('/', needAuth, function(req, res, next) {
  Room.find({user: req.user.id}, function(err, rooms) {
    if (err) {
      return res.status(500).json({message: 'interfefnal error', desc: err});
    }
    res.json(rooms);
  });
});
*/
router.post('/:id', function(req, res, next) {
  if (!req.body.content) {
    return res.status(400).json({message: 'need content'});
  }
  var newRoom = new Room({
    name: req.body.name,
    content: req.body.content,
    city: req.body.city,
    address: req.body.address,
    convenience: req.body.convenience,
    fee: req.body.fee,
    person:req.body.person,
    during: req.body.during,
    user: req.params.id
  });
  newRoom.save(function(err, doc) {
    if (err) {
      return res.status(500).json({message: 'internal error', desc: err});
    }
  });
  Room.find({},function(err,rooms){
    if(err)
    {
      return next(err);
    }
     res.render('posts',{rooms:rooms});
  });
});

router.get('/:id',function(req,res,next){
   Room.findById(req.params.id, function(err, post) {
    if (err) {
      return next(err);
    }
    res.render('post_show',{post:post});
  });
});


/*router.put('/:id', needAuth, function(req, res, next) {
  Room.findById(req.params.id, function(err, Room) {
    if (err) {
      return res.status(500).json({message: 'internal error', desc: err});
    }
    if (!Room) {
      return res.status(404).json({message: 'Room not found'});
    }
    if (req.body.content) {
      Room.content = req.body.content;
    }
    if (req.body.category) {
      Room.category = req.body.category;
    }
    if (req.body.priority) {
      Room.priority = req.body.priority;
    }
    if (req.body.deadline) {
      Room.deadline = req.body.deadline;
    }
    if (req.body.done) {
      Room.done = req.body.done;
    }
    Room.save(function(err) {
      if (err) {
        return res.status(500).json({message: 'internal error', desc: err});
      }
      res.json(Room);
    });
  });
});

router.get('/:id', needAuth, function(req, res, next) {
  Room.findById(req.params.id, function(err, Room) {
    if (err) {
      return res.status(500).json({message: 'internal error', desc: err});
    }
    if (!Room) {
      return res.status(404).json({message: 'Room not found'});
    }
    res.json(Room);
  });
});

router.delete('/:id', needAuth, function(req, res, next) {
  Room.findOneAndRemove({_id: req.params.id}, function(err, Room) {
    if (err) {
      return res.status(500).json({message: 'internal error', desc: err});
    }
    if (!Room) {
      return res.status(404).json({message: 'Room not found'});
    }
    res.json({id: Room._id});
  });
});
*/
module.exports = router;
