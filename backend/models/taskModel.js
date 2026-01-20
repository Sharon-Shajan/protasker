const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
  text: {
    type: String,
    required: [true, 'Please add a text value'],
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed'],
    default: 'pending'
  }
}, {
  timestamps: true,
});

// This specific line fixes your error:
module.exports = mongoose.model('Task', taskSchema);