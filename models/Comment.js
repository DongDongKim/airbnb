var mongoose = require('mongoose'),
    moment = require('moment'),
    Schema = mongoose.Schema;

var schema = new Schema({
  name: {type: String, required: true, trim: true},
  content: {type: String, required: true, trim: true},
  room: {type: Schema.Types.ObjectId, required: true},
  createdAt: {type: Date, default: Date.now},
}, {
  toJSON: {
    virtuals: true,
    transform: function(room) {
      return {
        id: room._id.toString(),
        name: room.name,
        content: room.content,
        //reservation: room.reservation,
      };
    }
  },
  toObject: {virtuals: true}
});

var Comment = mongoose.model('Comment', schema);

module.exports = Comment;
