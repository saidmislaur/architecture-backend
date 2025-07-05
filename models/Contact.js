const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
  email: String,
  phone: String,
  address: String,
})

module.exports = mongoose.model('Contact', contactSchema)
