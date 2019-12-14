const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
  firstname: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true }
});

module.exports = mongoose.model('Employee', employeeSchema);
