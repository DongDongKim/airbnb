var mongoose = require('mongoose'),
    moment = require('moment'),
    Schema = mongoose.Schema;

var schema = new Schema({
  name: {type: String, required: true, trim: true},
  content: {type: String, required: true, trim: true},
  city: {type: String, trim: true},
  address: {type: String, trim: true},
  convenience: {type: String, trim: true},
  fee: {type: Number, trim: true},
  during: Date,
  reservation: {type: Boolean, default: false},
  user: {type: Schema.Types.ObjectId, index: true, required: true},
  createdAt: {type: Date, default: Date.now}
}, {
  toJSON: {
    virtuals: true,
    transform: function(task) {
      return {
        id: task._id.toString(),
        category: task.category,
        content: task.content,
        priority: task.priority,
        deadline: (task.deadline) ? moment(task.deadline).format('YYYY-MM-DD') : "N/A",
        done: task.done
      };
    }
  },
  toObject: {virtuals: true}
});

var Room = mongoose.model('Task', schema);

module.exports = Room;
