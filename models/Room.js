var mongoose = require('mongoose'),
    moment = require('moment'),
    Schema = mongoose.Schema;

var schema = new Schema({
  name: {type: String, required: true, trim: true},
  content: {type: String, required: true, trim: true},
  city: {type: String, trim: true},
  address: {type: String, trim: true},
  convenience: {type: String, trim: true},
  fee: {type: String, trim: true},
  person:{type:Number,trim:true},
  during: Date,
  guest:{type: Schema.Types.ObjectId},
  guestName:{type:String,trim:true},
  reservation: {type: Boolean, default: false},
  permission: {type: Boolean, default: false},
  user: {type: Schema.Types.ObjectId, required: true},
  userName:{type:String, trim: true},
  createdAt: {type: Date, default: Date.now},
}, {
  toJSON: {
    virtuals: true,
    transform: function(room) {
      return {
        id: room._id.toString(),
        name: room.name,
        content: room.content,
        city: room.city,
        address: room.address,
        convenience: room.convenience,
        fee: room.fee,
        person: room.person,
        during: (room.deadline) ? moment(room.deadline).format('YYYY-MM-DD') : "N/A",
        //reservation: room.reservation,
      };
    }
  },
  toObject: {virtuals: true}
});

var Room = mongoose.model('Room', schema);

module.exports = Room;
