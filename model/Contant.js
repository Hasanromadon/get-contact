const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  email: {
    type: String,
    require: true,
  },
  phone: {
    type: Number,
    require: true,
  },
  type: {
    type: String,
    default: 'personal',
  },
  date: {
    type: String,
    default: Date.now,
  },
});

module.exports = mongoose.model('contacts', contactSchema);
