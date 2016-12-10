var express = require('express'),
    User = require('../models/User'),
    Room = require('../models/Room');
    Comment = require('../models/Comment');
var router = express.Router();

function needAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json({message: 'Not authorized'});
  }
}
function validateForm(form, options) {
  var name = form.name || "";
  var email = form.email || "";
  name = name.trim();
  email = email.trim();

  if (!name) {
    return '제목을 입력해주세요.';
  }

  if (!email) {
    return '이메일을 입력해주세요.';
  }

  if (!form.password && options.needPassword) {
    return '비밀번호를 입력해주세요.';
  }

  if (form.password !== form.password_confirmation) {
    return '비밀번호가 일치하지 않습니다.';
  }

  if (form.password.length < 6) {
    return '비밀번호는 6글자 이상이어야 합니다.';
  }

  return null;
}


router.post('/:id', function(req, res, next) {

  var newRoom = new Room({
    name: req.body.name,
    content: req.body.content,
    city: req.body.city,
    address: req.body.address,
    convenience: req.body.convenience,
    fee: req.body.fee,
    person:req.body.person,
    during: req.body.during,
    user: req.params.id,
  });
  newRoom.userName=req.user.name;
  newRoom.save(function(err, doc) {
    if (err) {
      return res.status(500).json({message: 'internal error', desc: err});
    }
  });
  res.redirect('/');
});

router.get('/:id',function(req,res,next){
   Room.findById(req.params.id, function(err, post) {
    if (err) {
      return next(err);
    }
    Comment.find({room:req.params.id},function(err,comments){
      if (err) {
        return next(err);
      }
      res.render('post_show',{post:post,comments:comments});
    });

   
  });
});

router.post('/comment/:id', function(req, res, next) {
  var newComment=new Comment({
    name:req.user.name,
    content:req.body.content,
    room:req.params.id
  });
  newComment.save(function(err){
    if(err)
    {
      return next(err);
    }
    res.redirect('back');
  });
  /*Room.findById(req.params.id, function(err, post) {
    if (err) {
      return next(err);
    }
    Comment.find({room:req.params.id},function(err,comments){
      if (err) {
        return next(err);
      }
      res.render('post_show',{post:post,comments:comments});
    });
  });  */
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
